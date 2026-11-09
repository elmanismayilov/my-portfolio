"use client";

import { useEffect, useRef, useState } from "react";
import claimStatus from "../../public/projects/claim-status.png";
import { STATUS_BACKGROUND, StatusBackdrop, StatusPhone, useStatusStage } from "./StatusTimeline";

const PHONE_W = 340; // the phone's natural width

/**
 * Cover of the "Contract Payout Claim" project: the live status-timeline phone from the case study,
 * on its gradient backdrop. Fills its parent, shrinks the phone to fit, and plays while in view.
 */
export default function StatusCover() {
  const boxRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const stage = useStatusStage(boxRef);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const box = boxRef.current;
    const phone = phoneRef.current;
    if (!box || !phone) return;
    const fit = () => {
      // the phone grows while the "missing document" alert is open, so fit its tallest state
      const alert = phone.querySelector<HTMLElement>("[data-collapse-inner]");
      const tallest = phone.offsetHeight + (alert ? alert.scrollHeight - alert.offsetHeight : 0);
      const next = Math.min(1, (box.clientHeight * 0.7) / tallest, (box.clientWidth * 0.6) / PHONE_W);
      setScale(Number.isFinite(next) && next > 0 ? next : 0.6);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    ro.observe(phone); // also when fonts or images finish loading and the phone changes size
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: STATUS_BACKGROUND }}
    >
      <StatusBackdrop />
      <div className="relative shrink-0" style={{ width: PHONE_W, transform: `scale(${scale})` }}>
        <StatusPhone ref={phoneRef} stage={stage} image={claimStatus} />
      </div>
    </div>
  );
}
