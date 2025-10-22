import styles from "./ApplyJoin.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useState } from "react";
import Appliance from "../Appliance";

export default function ApplyJoin({ setApplyModalOpen }) {
    const [applianceOpen, setApplianceOpen] = useState(null); 

    return (
        <>
            <div className={styles.modalBackground}>
                <div className={styles.modalContent}>
                    <img
                        src={closeModal}
                        onClick={() => setApplyModalOpen(false)}
                        className={styles.closeIcon}
                    />
                    <h3>참가 요청</h3>

                    <div className={styles.applyContainer}>
                        {dummy.map(person => (
                            <div className={styles.apply} key={person.id}>
                                <div className={styles.info}>
                                    <div className={styles.profileImg}></div>
                                    <span>{person.id}</span>
                                </div>

                                <button 
                                    className={styles.check} 
                                    onClick={() => setApplianceOpen(person.id)} 
                                >
                                    참가 요청서 확인
                                </button>

                                {applianceOpen === person.id && (
                                    <Appliance 
                                        person={person} 
                                        setApplianceOpen={setApplianceOpen} 
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

const dummy = [
    {
      "id": "dev_pioneer",
      "introduce": "안녕하세요, 5년차 백엔드 개발자입니다. 이번 프로젝트의 기술 스택과 비전에 깊이 공감하여 지원하게 되었습니다. 안정적인 서버 아키텍처 구축과 효율적인 API 개발을 통해 프로젝트 성공에 기여하고 싶습니다. 함께 성장하는 협업을 기대합니다!안녕하세요, 5년차 백엔드 개발자입니다. 이번 프로젝트의 기술 스택과 비전에 깊이 공감하여 지원하게 되었습니다. 안정적인 서버 아키텍처 구축과 효율적인 API 개발을 통해 프로젝트 성공에 기여하고 싶습니다. 함께 성장하는 협업을 기대합니다!"
    },
    {
      "id": "design_creator",
      "introduce": "사용자 경험(UX)을 중심으로 직관적이고 매력적인 UI를 설계하는 디자이너입니다. 프로젝트의 목표를 시각적으로 구현하고 사용자 만족도를 높이는 데 자신 있습니다. 멋진 팀과 함께 시너지를 내고 싶어 지원합니다."
    },
    {
      "id": "marketing_guru",
      "introduce": "데이터 기반의 그로스 마케팅 전략 수립에 능숙한 마케터입니다. 설정하신 타겟 고객층에게 프로젝트의 가치를 효과적으로 전달하고 초기 유저 확보를 책임질 수 있습니다. 함께 서비스를 성장시키는 짜릿한 경험을 하고 싶습니다."
    },
    {
      "id": "contents_artist",
      "introduce": "사람의 마음을 움직이는 스토리텔링 콘텐츠를 제작하는 것을 좋아합니다. 영상 기획과 제작, 편집까지 모두 가능합니다. 이번 프로젝트의 이야기를 더 많은 사람에게 매력적으로 전달하는 역할을 맡고 싶습니다."
    },
    {
      "id": "planner_joy",
      "introduce": "꼼꼼한 시장 분석과 사용자 리서치를 바탕으로 성공적인 프로덕트를 기획해온 경험이 있습니다. 팀원들과의 원활한 커뮤니케이션을 통해 프로젝트가 올바른 방향으로 나아갈 수 있도록 돕겠습니다. 열정적인 팀원들과 함께하고 싶네요."
    },
    {
      "id": "frontend_master",
      "introduce": "웹 표준과 접근성을 준수하며 인터랙티브한 프론트엔드 개발을 즐깁니다. 디자이너의 의도를 정확히 구현하고 사용자에게 최고의 웹 경험을 선사하고 싶습니다. 이번 협업을 통해 기술적으로 한 단계 더 성장하고 싶습니다."
    },
    {
      "id": "mobile_dev_lee",
      "introduce": "iOS와 Android 네이티브 앱 개발 경험이 풍부합니다. 프로젝트의 모바일 앱 개발 파트에 참여하여 사용자들에게 빠르고 안정적인 서비스를 제공하고 싶습니다. 훌륭한 동료들과 함께 일할 기회를 기대합니다."
    },
    {
      "id": "data_analyst_kim",
      "introduce": "데이터 속에서 인사이트를 찾아내는 데이터 분석가입니다. 사용자 행동 데이터를 분석하여 서비스 개선 방향을 제시하고, 데이터 기반의 의사결정을 돕고 싶습니다. 프로젝트의 성장에 실질적인 기여를 하고 싶어 지원하게 되었습니다."
    },
    {
        "id": "wowowo",
        "introduce": "데이터 속에서 인사이트를 찾아내는 데이터 분석가입니다. 사용자 행동 데이터를 분석하여 서비스 개선 방향을 제시하고, 데이터 기반의 의사결정을 돕고 싶습니다. 프로젝트의 성장에 실질적인 기여를 하고 싶어 지원하게 되었습니다."
    },
    {
        "id": "???",
        "introduce": "데이터 속에서 인사이트를 찾아내는 데이터 분석가입니다. 사용자 행동 데이터를 분석하여 서비스 개선 방향을 제시하고, 데이터 기반의 의사결정을 돕고 싶습니다. 프로젝트의 성장에 실질적인 기여를 하고 싶어 지원하게 되었습니다."
      },
      {
        "id": "fdsbhfn",
        "introduce": "데이터 속에서 인사이트를 찾아내는 데이터 분석가입니다. 사용자 행동 데이터를 분석하여 서비스 개선 방향을 제시하고, 데이터 기반의 의사결정을 돕고 싶습니다. 프로젝트의 성장에 실질적인 기여를 하고 싶어 지원하게 되었습니다."
      },
      {
        "id": "sbhsyjyruk",
        "introduce": "데이터 속에서 인사이트를 찾아내는 데이터 분석가입니다. 사용자 행동 데이터를 분석하여 서비스 개선 방향을 제시하고, 데이터 기반의 의사결정을 돕고 싶습니다. 프로젝트의 성장에 실질적인 기여를 하고 싶어 지원하게 되었습니다."
      }
];
