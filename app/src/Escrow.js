import { useEffect, useState } from "react";

export default function Escrow({
  isApproved,
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  sender,
  chainId,
}) {
  const [errMsg, setErrMsg] = useState("");

  const approve = async () => {
    try {
      setErrMsg("");
      handleApprove();
    } catch (err) {
      console.error(err);
      setErrMsg(err.msg);
    }
  };

  useEffect(() => {
    const escrowEl = document.getElementById(address);
    if (isApproved && escrowEl) {
      escrowEl.className = "complete";
    }
  });

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Chain ID </div>
          <div> {chainId} </div>
        </li>
        <li>
          <div> Sender </div>
          <div> {sender} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} ETH </div>
        </li>

        <div
          className="button"
          id={address}
          onClick={(e) => {
            e.preventDefault();

            approve();
          }}
        >
          {isApproved ? "✓ It's been approved!" : "Approve"}
        </div>
        {errMsg && <div>{errMsg}</div>}
      </ul>
    </div>
  );
}
