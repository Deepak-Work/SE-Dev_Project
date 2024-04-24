import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let verifyEmail = async () => {
      const response = await fetch(
        `/api/authentication/verify-email/${uid}/${token}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        console.log('test');
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    };
    verifyEmail();
  }, [uid, token]);

  return (
    <div>
        {isVerified ? <h1>Email verified successfully</h1> : <h1>Email verification failed</h1>}
    </div>
  )
};

export default VerifyEmail;
