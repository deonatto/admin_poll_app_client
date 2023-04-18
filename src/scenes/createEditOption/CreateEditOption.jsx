import CreateEditOptionForm from "components/forms/createEditOptionForm/CreateEditOptionForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditOption.css";

const CreateEditOption = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="create-edit-option-container">
      <CreateEditOptionForm
        isEdit={!!id}
        token={token}
        optionId={id}
        btnName="Save"
      />
    </div>
  );
};

export default CreateEditOption;