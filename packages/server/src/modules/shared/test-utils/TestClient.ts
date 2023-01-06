import { BookingInput } from "../../../types/types";

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

  async register(email: string, password: string) {
    return rp.post(this.url, {
      ...this.options,
      body: {
        query: `
          mutation {
            register (email: "${email}", password: "${password}") {
              path
              message
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
              errors {
                path
                message
              }
              sessionId
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
              path
              message
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
            input: {start: "${input.start}", end: "${input.end}", guests: ${input.guests}})
          }
        `,
      },
    });
  }
}
