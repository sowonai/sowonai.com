import React from "react";

export const RefineLogoIcon = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className="flex items-center gap-3 no-underline hover:no-underline" 
    style={{ 
      display: 'flex', 
      alignItems: 'center',
      textDecoration: 'none'
    }} 
    {...props}
  >
    <img
      src="/img/LogoIcon2.png"
      alt="sowonai"
      width={32}
      height={24}
      className="flex-shrink-0"
      style={{ flexShrink: 0 }}
    />
    <span 
      className="text-lg font-bold leading-none no-underline"
      style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        lineHeight: '1',
        color: 'currentColor',
        marginLeft: '6px',
        textDecoration: 'none'
      }}
    >
      SowonAI
    </span>
  </div>
);
