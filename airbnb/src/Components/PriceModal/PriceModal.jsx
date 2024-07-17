import Heading from "../Heading/Heading";
import Input from "../Input/Input";
import StyledButton from "../Button/Button";
import BackButton from "../BackButton/BackButton";

const PriceModal = ({ setStep, createProperty, price, setPrice }) => {
  return (
    <div className="flex flex-col py-5 px-5 gap-7">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
        
      />
      <Input
        type={"number"}
        label={"$ Price"}
        value={price}
        setValue={setPrice}
      />
      <div className="flex flex-row gap-4">
        <BackButton
          width={"50%"}
          text={"Back"}
          func={() => setStep("description")}
        />
        <StyledButton
          width={"50%"}
          color={"rgb(244, 63, 94)"}
          text={"Create"}
          disabled={price < 1 ? true : false}
          func={createProperty}
        />
      </div>
    </div>
  );
};

export default PriceModal;
