import axiosInstance from '../../axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LodingChatting() {
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyTeams() {
      try {
        const res = await axiosInstance.get('/teams/my-teams');
        const teams = res.data;
        if (teams.length > 0 && teams[0].chatRoomIds && teams[0].chatRoomIds.length > 0) {
          navigate(`/chatting/${teams[0].chatRoomIds[0]}`);
        } else {
          navigate('/', { state: { teamExists: 'false' } });
        }
      } catch (err) {
        navigate('/', { state: { teamExists: 'false' } });
      }
    }
    fetchMyTeams();
  }, [navigate]);

  return (
    <>
    </>
  );
}
