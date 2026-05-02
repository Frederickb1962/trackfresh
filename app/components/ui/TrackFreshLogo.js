"use client";

import React from "react";

export function AiBadge({ style = {} }) {
  return (
    <span style={{whiteSpace:"nowrap",...style}}>
      <span style={{color:"#f97316",fontWeight:900,fontSize:"1.2em",lineHeight:1,letterSpacing:"-0.02em"}}>A</span><span style={{color:"#4ade80",fontWeight:900,lineHeight:1,marginLeft:"0.02em"}}>i</span>
    </span>
  );
}

export function GreenDot() {
  return <span style={{display:"inline-block",width:"0.32em",height:"0.32em",background:"#22c55e",borderRadius:"50%",marginLeft:"0.05em",marginRight:"0em",verticalAlign:"baseline",boxShadow:"0 0 7px #22c55e,0 0 14px rgba(34,197,94,0.4)",flexShrink:0}} />;
}

export function TrackFreshLogo({ showBroc = true, style = {} }) {
  return (
    <span style={{whiteSpace:"nowrap",...style}}>
      {showBroc && <>{String.fromCodePoint(0x1F966)} </>}<span style={{color:"#fff",fontWeight:900}}>TrackFresh</span><GreenDot /><AiBadge />
    </span>
  );
}
