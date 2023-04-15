import CreateEditUserForm from "components/forms/createEditForm/CreateEditUserForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditUser.css";

const CreateEditUser = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="create-edit-user-container">
      <CreateEditUserForm
        isEdit={!!id}
        token={token}
        userId={id}
        btnName="Save"
      />
    </div>
  );
};

export default CreateEditUser;
