import React from "react";

const WalletConnectButton = () => {
    return (
        <button
            style={{
                backgroundColor: "white",
                color: "orange",
                border: "2px solid orange",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
        >
            <svg
                width="28"
                height="20"
                viewBox="0 0 28 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: "10px" }}
            >
                <path
                    d="M7.18463 2.21015C11.8327 -2.12765 19.1673 -2.12765 23.8154 2.21015L24.5183 2.8581C24.9031 3.21474 24.9031 3.78526 24.5183 4.1419L22.5466 5.96747C22.3542 6.14579 22.0434 6.14579 21.851 5.96747L20.8987 5.08821C17.7367 2.13135 13.2633 2.13135 10.1013 5.08821L9.07258 6.03481C8.88025 6.21313 8.56942 6.21313 8.37708 6.03481L6.40538 4.20924C6.02059 3.8526 6.02059 3.28208 6.40538 2.92544L7.18463 2.21015ZM27.0822 5.98313L28.8235 7.59129C29.2083 7.94793 29.2083 8.51845 28.8235 8.87509L20.8987 16.2118C20.514 16.5684 19.8956 16.5684 19.5108 16.2118L13.9058 11.0073C13.8096 10.9181 13.6548 10.9181 13.5586 11.0073L7.95362 16.2118C7.56883 16.5684 6.95044 16.5684 6.56565 16.2118L-1.37705 8.87509C-1.76184 8.51845 -1.76184 7.94793 -1.37705 7.59129L0.364256 5.98313C0.748907 5.62649 1.3673 5.62649 1.75209 5.98313L7.35708 11.1877C7.45326 11.2768 7.60804 11.2768 7.70422 11.1877L13.3092 5.98313C13.694 5.62649 14.3124 5.62649 14.6972 5.98313L20.3022 11.1877C20.3983 11.2768 20.5531 11.2768 20.6493 11.1877L26.2543 5.98313C26.6391 5.62649 27.2575 5.62649 27.0822 5.98313Z"
                    fill="orange"
                />
            </svg>
            Connect Wallet
        </button>
    );
};

export default WalletConnectButton;
