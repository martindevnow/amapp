import React from "react";
import useRoom from "../../hooks/useRoom.hook";
import Button from "../ui/button.component";
import Input from "../ui/input.component";

interface RoomMetaFormProps {
  roomId: string;
  onSaved?: Function;
}

const topicValidation = (topic: string) => {
  if (topic.trim() === "") {
    return "Name is required";
  }

  return null;
};

const dateValidation = (date: string) => {
  if (!/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date)) {
    return "Date must be 'YYYY-MM-DD'";
  }
  return null;
};

const RoomMetaForm = ({ roomId, onSaved }: RoomMetaFormProps) => {
  const { room, roomsService } = useRoom(roomId);

  const [mtgTopic, setMtgTopic] = React.useState(room?.zoomMeetingTopic || "");
  const [mtgDate, setMtgDate] = React.useState(room?.zoomMeetingDate || "");
  const [cfVideoUrl, setCfVideoUrl] = React.useState(room?.cfVideoUrl || "");

  React.useEffect(() => {
    setMtgTopic(room?.zoomMeetingTopic || "");
    setMtgDate(room?.zoomMeetingDate || "");
    setCfVideoUrl(room?.cfVideoUrl || "");
  }, [room]);

  const saveMeta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const topicError = topicValidation(mtgTopic);
    const dateError = dateValidation(mtgDate);
    if (topicError !== null || dateError !== null) {
      alert(topicError || dateError);
      return;
    }
    await roomsService.updateRoom(roomId, {
      zoomMeetingDate: mtgDate,
      zoomMeetingTopic: mtgTopic,
      cfVideoUrl: cfVideoUrl,
    });
    onSaved?.();
  };

  return (
    <form onSubmit={saveMeta}>
      <label>
        Topic:
        <Input
          value={mtgTopic}
          placeholder="Topic as written in Zoom..."
          onChange={(e) => setMtgTopic(e.target.value)}
        />
      </label>
      <label>
        Meeting Date:
        <Input
          value={mtgDate}
          placeholder="Date of Meeting (YYYY-MM-DD)"
          onChange={(e) => setMtgDate(e.target.value)}
        />
      </label>
      <label>
        CloudFront URL:
        <Input
          value={mtgDate}
          placeholder="URL of the AMA-XXXX-XX-XX.m3u8 file"
          onChange={(e) => setCfVideoUrl(e.target.value)}
        />
      </label>
      <Button type="submit">Save</Button>
    </form>
  );
};

export default RoomMetaForm;
