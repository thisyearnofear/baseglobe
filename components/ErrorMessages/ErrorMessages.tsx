// src/components/ErrorMessages.tsx
import React from "react";

interface ErrorMessagesProps {
  mintError?: Error | null; // Allow null
  txError?: Error | null; // Allow null
}

const ErrorMessages: React.FC<ErrorMessagesProps> = ({
  mintError,
  txError,
}) => {
  return (
    <>
      {mintError && (
        <p style={{ marginTop: 24, color: "#FF6257" }}>
          Error: {mintError.message}
        </p>
      )}
      {txError && (
        <p style={{ marginTop: 24, color: "#FF6257" }}>
          Error: {txError.message}
        </p>
      )}
    </>
  );
};

export default ErrorMessages;
