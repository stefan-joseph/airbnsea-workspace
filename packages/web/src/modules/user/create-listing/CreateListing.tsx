import { useParams } from "react-router-dom";
import { UpdateUnpublishedListing } from "./UpdateUnpublishedListing";
import { useCreateListingMutation } from "@airbnb-clone/controller";
import { VesselType } from "./steps/VesselType";
import { Name } from "./steps/Name";
import { Address } from "./steps/Address";
import { Photos } from "./steps/Photos";
export const CreateListing = () => {
  const { listingId, step } = useParams();

  if (!listingId && !step)
    return (
      <UpdateUnpublishedListing
        text="Let's begin a new listing. Which kind of vessel do you have?"
        formStep={<VesselType />}
        fields={["vesselType"]}
        nextStep="name"
      />
    );

  if (listingId) {
    if (step === "vessel-type") {
      return (
        <UpdateUnpublishedListing
          text="Which kind of vessel do you have?"
          formStep={<VesselType />}
          fields={["vesselType"]}
          nextStep="name"
        />
      );
    } else if (step === "name") {
      return (
        <UpdateUnpublishedListing
          text="What would you like the title of your listing to be?"
          formStep={<Name />}
          fields={["name"]}
          prevStep="vessel-type"
          nextStep="address"
        />
      );
    } else if (step === "address") {
      return (
        <UpdateUnpublishedListing
          text="Where's your vessel located?"
          formStep={<Address />}
          fields={["street", "apt", "city", "state", "country", "zipcode"]}
          fieldHeader="address"
          prevStep="name"
          nextStep="photos"
        />
      );
    } else if (step === "photos") {
      return (
        <UpdateUnpublishedListing
          text="Next, let's add some photos of your vessel."
          formStep={<Photos />}
          fields={["photos"]}
          fieldHeader="photos"
          prevStep="address"
          nextStep="name"
        />
      );
    }
  }

  return <div>Error page</div>;
};
