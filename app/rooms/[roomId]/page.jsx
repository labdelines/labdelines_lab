// app/rooms/[roomId]/page.jsx
import DynamicRoomBooking from "@/components/DynamicRoomBooking";

export default async function RoomPage({ params }) {
  const { roomId } = await params;
  return <DynamicRoomBooking roomId={roomId} />;
}
