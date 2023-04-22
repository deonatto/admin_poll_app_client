import CreateEditPollOptionForm from "components/forms/createEditPollOptionForm/CreateEditPollOptionForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditPollOption.css";

const CreateEditPollOption = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="create-edit-option-container">
      <CreateEditPollOptionForm
        isEdit={!!id}
        token={token}
        optionId={id}
        btnName="Save"
      />
    </div>
  );
};

export default CreateEditPollOption;
