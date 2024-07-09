import Heading from "../Heading/Heading";
import Input from "../Input/Input";
import StyledButton from "../Button/Button";
import BackButton from "../BackButton/BackButton";

const DescriptionModal = ({
  setStep,
  description,
  setDescription,
  title,
  setTitle,
}) => {
  return (
    <div className="flex flex-col py-5 px-5 gap-7">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />
      <Input type={"text"} label={"Title"} value={title} setValue={setTitle} />
      <hr style={{ width: "100%" }} />
      <Input
        type={"text"}
        label={"Description"}
        value={description}
        setValue={setDescription}
      />
      <div className="flex flex-row gap-4">
        <BackButton width={"50%"} text={"Back"} func={() => setStep("image")} />
        <StyledButton
          width={"50%"}
          color={"rgb(244, 63, 94)"}
          text={"Next"}
          disabled={!title || !description ? true : false}
          func={() => setStep("price")}
        />
      </div>
    </div>
  );
};

export default DescriptionModal;
