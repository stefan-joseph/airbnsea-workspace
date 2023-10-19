import { BookingInput, InboxType } from "../../../types/types";

const rp = require("request-promise");

export class TestClient {
  url: string;
  options: {
    jar: any;
    withCredentials: boolean;
    json: boolean;
  };
  constructor(endpoint: string) {
    this.url = (process.env.TEST_HOST as string) + endpoint;
    this.options = {
      withCredentials: true,
      jar: rp.jar(),
      json: true,
    };
  }

  async checkEmail(email: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          query {
            checkEmail (email: "${email}") {
              ...on UserExistsWithPassword {
                email
                userExists
              }
              ...on UserExistsWithOAuth {
                authorizationServer
                email
                firstName
                avatar
              }
              ... on NoUserWithThisEmail{
                email
                userExists
              }
              ... on UserNotConfirmed {
                email
                userExists
              }
              ... on ValidationError {
                message
                field
              }
            } 
          }
        `,
      },
    });
  }

  async register(email: string, password: string, firstName: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            register (email: "${email}", password: "${password}", firstName: "${firstName}") {
              ...on ValidationError {
                message
                field
              }
              ...on SuccessResponse {
                success
              }
              ... on UserExistsWithIncorrectPassword {
                email
                firstName
                avatar
              }
              ... on UserExistsWithOAuth {
                authorizationServer
                email
                firstName
                avatar
              }
              ... on UserLogin {
                success
              }
            } 
          }
        `,
      },
    });
  }

  async login(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            login(email: "${email}", password: "${password}") {
              ...on ValidationError {
                message
                field
              }
              ...on SuccessResponse {
                success
              }
            }
          }
        `,
      },
    });
  }

  async logout() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            logout 
          }
        `,
      },
    });
  }

  async resetPassword(newPassword: string, key: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            resetPassword(newPassword: "${newPassword}", key: "${key}") {
              ...on ValidationError {
                field
                message
              }
              ...on SuccessResponse {
                success
              }
            }
          }
        `,
      },
    });
  }

  async me() {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          {
            me {
              firstName
              avatar
            }
          }
        `,
      },
    });
  }

  async viewListing(listingId: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          query {
            viewListing(listingId: "${listingId}") {
              id
              userId
              name
              vesselType
              price
              description
              guests
              beds
              rating
              amenities
              street
              apt
              city
              state
              country
              zipcode
              longitude
              latitude
              photos
              owner {
                firstName
                lastName
                avatar
              }
            }
          }
        `,
      },
    });
  }

  async createBooking(listingId: string, input: BookingInput) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createBooking(listingId: "${listingId}",
            input: {start: "${input.start}", end: "${input.end}", guests: ${input.guests}}){
              start
              end
              guests
              pricePerNight
              serviceFee
              taxes
              total
              listing {
                vesselType
                name
                img
                rating
              }
            }
          }
        `,
      },
    });
  }

  async createConversation(listingId: string, text: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createConversation(listingId: "${listingId}", text: "${text}"){
              ... on ConversationSuccess {
                conversationId
              }
              ... on Redirect {
                redirect
              }
            }
          }
        `,
      },
    });
  }

  async createMessage(conversationId: string, text: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            createMessage(conversationId: "${conversationId}",
            text: "${text}")
          }
        `,
      },
    });
  }

  async populateInbox(inboxType: InboxType) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          query {
            populateInbox(inboxType: ${inboxType}) {
              id
              text
              fromHost
              createdDate
              conversationId
              interlocutorId
              interlocutor {
                avatar
                firstName
                lastName
              }
            }
          }
        `,
      },
    });
  }

  async populateConversation(conversationId: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          query {
            populateConversation(conversationId: "${conversationId}") {
              interlocutorId
              interlocutor {
                avatar
                firstName
                lastName
              }
              listingId
              listing {
                name
                img
              }
              messages {
                id
                text
                fromHost
                createdDate
              }
            }
          }
        `,
      },
    });
  }

  // async newMessage(conversationId: string) {
  //   return rp.post(this.url, {
  //     ...this.options,
  //     body: {
  //       query: `
  //         subscription {
  //           newMessage(conversationId: "${conversationId}") {
  //             id
  //             text
  //             fromHost
  //             createdDate
  //           }
  //         }
  //       `,
  //     },
  //   });
  // }
}
