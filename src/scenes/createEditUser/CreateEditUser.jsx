import CreateEditUserForm from "components/forms/createEditForm/CreateEditUserForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditUser.css";

const CreateEditUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = useSelector((state) => state.token);
  return (
    <div className="create-edit-user-container">
      <CreateEditUserForm isEdit={!!id} />
    </div>
  );
};

export default CreateEditUser;
