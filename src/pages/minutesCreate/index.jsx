import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MinutesCreate() {
  const { teamId, minuteId } = useParams();
  const navigate = useNavigate();

  const [minuteData, setMinuteData] = useState(null);

  useEffect(() => {
    if (!minuteId) return;

    // 예시: API 호출 (실제로 사용하는 axios 코드 넣으면 됨)
    async function fetchMinute() {
      try {
        const response = await fetch(`/api/minutes/${teamId}/${minuteId}`); // 실제 API 작성해
        const data = await response.json();
        setMinuteData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMinute();
  }, [teamId, minuteId]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>회의록 상세보기</h1>

      <p>teamId: {teamId}</p>
      <p>minuteId: {minuteId}</p>

      {!minuteData && <p>불러오는 중...</p>}

      {minuteData && (
        <div>
          <h2>{minuteData.title}</h2>
          <p>{minuteData.content}</p>
        </div>
      )}
    </div>
  );
}
