import React from "react";

// Simplified sandpack component that just renders a placeholder
export const Sandpack = (props: any) => {
    return (
        <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '16px', 
            backgroundColor: '#f5f5f5',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666'
        }}>
            <p>Sandpack component is temporarily disabled for compatibility reasons.</p>
        </div>
    );
};
