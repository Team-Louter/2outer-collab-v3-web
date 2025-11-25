import styles from "./ApplyJoin.module.css";
import closeModal from "../../assets/projectSetting/delete.svg";
import { useEffect, useState } from "react";
import Appliance from "../Appliance";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";

export default function ApplyJoin({ setApplyModalOpen }) {
    const [applianceOpen, setApplianceOpen] = useState(false); 
    const { teamId } = useParams();
    const [applies, setApplies] = useState(null);

    const applyJoin = async () => {
      let res
      try {
        res = await axiosInstance.get(`/teams/${teamId}/join-requests`);
        setApplies(res.data);
        console.log("지원서들", res.data);
      }
      catch(err) {
        console.error(err);
      }
    }

    useEffect(() => {
      applyJoin();
    }, [])

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
                        {applies?.map(apply => (
                            <div className={styles.apply} key={apply.requestId}>
                                <div className={styles.info}>
                                    <img src={apply.profilePicture} />
                                    <span>{apply.userName}</span>
                                </div>

                                <button 
                                    className={styles.check} 
                                    onClick={() => setApplianceOpen(true)} 
                                >
                                    참가 요청서 확인
                                </button>

                                {applianceOpen && 
                                    <Appliance 
                                        apply={apply} 
                                        setApplianceOpen={setApplianceOpen} 
                                    />
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
