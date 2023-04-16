import CreateEditPollForm from "components/forms/createEditPollForm/CreateEditPollForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./CreateEditPoll.css";

const CreateEditPoll = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  return (
    <div className="create-edit-poll-container">
      <CreateEditPollForm
        isEdit={!!id}
        token={token}
        pollId={id}
        btnName="Save"
      />
    </div>
  );
};

export default CreateEditPoll;
