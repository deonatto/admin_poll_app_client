import CreateEditUserForm from "components/forms/createEditForm/CreateEditUserForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditUser.css";

const CreateEditUser = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="create-edit-user-container">
      <CreateEditUserForm isEdit={!!id} token={token} userId={id} />
    </div>
  );
};

export default CreateEditUser;
