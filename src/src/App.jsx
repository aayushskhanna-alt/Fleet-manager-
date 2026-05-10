import { useState, useMemo } from "react";

const DATA = [
  {id:"B014",car:"Creta 2018",customer:"Lt Vignesh",type:"Daily",start:"27 Aug 25",end:"31 Aug 25",days:4,revenue:9800,security:5000,refund:5000,status:"Done",pickup:"Airport",drop:"Airport",driver:"Ashok",review:"Yes"},
  {id:"B013",car:"Ecosport 2015",customer:"AVM Atul Garg",type:"Daily",start:"29 Aug 25",end:"1 Sep 25",days:3,revenue:7100,security:5000,refund:5500,status:"Done",pickup:"Other",drop:"Self",driver:"Ajit Saha",review:"Yes"},
  {id:"B004",car:"Creta 2018",customer:"Maj Abhay Singh",type:"Daily",start:"31 Aug 25",end:"2 Sep 25",days:2,revenue:2900,security:5000,refund:5000,status:"Done",pickup:"Airport",drop:"Self",driver:"Ajit Saha",review:"Yes"},
  {id:"B015",car:"City 2017",customer:"Col Mishra",type:"Weekly",start:"25 Aug 25",end:"2 Sep 25",days:8,revenue:8600,security:5000,refund:4000,status:"Done",pickup:"Self",drop:"Self",driver:"Ajit Saha",review:"Yes"},
  {id:"B012",car:"XUV 2017",customer:"Wg Cdr Kapil Yadav",type:"Daily",start:"30 Aug 25",end:"3 Sep 25",days:4,revenue:9000,security:5000,refund:5000,status:"Done",pickup:"Other",drop:"Other",driver:"Ashok",review:"No"},
  {id:"B008",car:"Ertiga 2014",customer:"Lt Col Pratap",type:"Daily",start:"2 Sep 25",end:"4 Sep 25",days:2,revenue:3800,security:5000,refund:5000,status:"Done",pickup:"Other",drop:"Other",driver:"Ajit Saha",review:"Yes"},
  {id:"B010",car:"Creta 2018",customer:"Cdr Manish Panwar",type:"Daily",start:"2 Sep 25",end:"4 Sep 25",days:2,revenue:3400,security:5000,refund:5000,status:"Done",pickup:"Other",drop:"Other",driver:"Tapas",review:"No"},
  {id:"B016",car:"Amaze 2018",customer:"Mrs Gaganpreet",type:"Weekly",start:"21 Aug 25",end:"5 Sep 25",days:15,revenue:8600,security:5000,refund:4500,status:"Done",pickup:"Self",drop:"Self",driver:"Ashok",review:"Yes"},
  {id:"B006",car:"Ecosport 2015",customer:"Cdr Prashant Panwar",type:"Weekly",start:"1 Sep 25",end:"6 Sep 25",days:6,revenue:11200,security:5000,refund:5000,status:"Done",pickup:"Airport",drop:"Airport",driver:"Ajit Saha",review:"No"},
  {id:"B017",car:"Ertiga 2014",customer:"Col Sumit Kadian",type:"Daily",start:"3 Sep 25",end:"6 Sep 25",days:2,revenue:3400,security:3000,refund:2609,status:"Done",pickup:"Airport",drop:"Airport",driver:"Ajit Saha",review:"Yes"},
  {id:"B005",car:"City 2017",customer:"Lt Col Nandy",type:"Daily",start:"4 Sep 25",end:"7 Sep 25",days:3,revenue:3500,security:5000,refund:2820,status:"Done",pickup:"Airport",drop:"Self",driver:"Ashok",review:"No"},
  {id:"B009",car:"Creta 2018",customer:"Lt Col Manu Pandey",type:"Daily",start:"4 Sep 25",end:"7 Sep 25",days:3,revenue:4600,security:5000,refund:2802,status:"Done",pickup:"Airport",drop:"Hotel",driver:"Ajit Saha",review:"Yes"},
  {id:"B019",car:"Brio 2013",customer:"Capt Abhishek Jain",type:"Monthly",start:"23 Aug 25",end:"22 Sep 25",days:30,revenue:21240,security:5000,refund:4000,status:"Done",pickup:"Self",drop:"Self",driver:"Tapas",review:"Yes"},
  {id:"B018",car:"Kwid 2020",customer:"Col Ritesh Rastogi",type:"Monthly",start:"7 Aug 25",end:"5 Nov 25",days:90,revenue:60000,security:5000,refund:3995,status:"Done",pickup:"Self",drop:"Self",driver:"Tapas",review:"Yes"},
  {id:"B023",car:"Etios 2013",customer:"Cdr Sachin Thakur",type:"Monthly",start:"7 Sep 25",end:"11 Oct 25",days:34,revenue:20900,security:5000,refund:4400,status:"Done",pickup:"Hotel",drop:"Self",driver:"Ajit Saha",review:"No"},
  {id:"B026",car:"Etios 2017",customer:"Gen Gagandeep",type:"Monthly",start:"15 Sep 25",end:"17 Oct 25",days:34,revenue:27200,security:5000,refund:5000,status:"Done",pickup:"Self",drop:"Self",driver:"Ashok",review:"Yes"},
  {id:"B051",car:"Creta 2018",customer:"Vijay Kumar PAS",type:"Weekly",start:"26 Sep 25",end:"19 Oct 25",days:25,revenue:27500,security:5000,refund:3000,status:"Done",pickup:"Other",drop:"Self",driver:"Tapas",review:""},
  {id:"B053",car:"XUV 2017",customer:"Anoop Dobriyal",type:"Daily",start:"30 Sep 25",end:"6 Oct 25",days:6,revenue:15000,security:5000,refund:4400,status:"Done",pickup:"Other",drop:"Self",driver:"Ashok",review:"No"},
  {id:"B055",car:"Creta 2018",customer:"SQN LDR Lalit Verma",type:"Weekly",start:"25 Oct 25",end:"8 Nov 25",days:14,revenue:14300,security:5000,refund:3900,status:"Done",pickup:"Other",drop:"Self",driver:"Ashok",review:"Yes"},
  {id:"B063",car:"Ertiga 2014",customer:"Col Satish Narula",type:"Weekly",start:"1 Oct 25",end:"9 Oct 25",days:9,revenue:16200,security:5000,refund:5000,status:"Done",pickup:"Airport",drop:"Self",driver:"Ashok",review:"Yes"},
  {id:"B074",car:"Ertiga 2014",customer:"Lt Col Kshitij Meston",type:"Monthly",start:"5 Dec 25",end:"4 Jan 26",days:30,revenue:40000,security:5000,refund:5000,status:"Done",pickup:"Self",drop:"Self",driver:"SELF",review:"Yes"},
  {id:"B084",car:"Amaze 2018",customer:"Cdr Sachin Gupta",type:"Daily",start:"16 Oct 25",end:"19 Oct 25",days:3,revenue:8000,security:5000,refund:5000,status:"Done",pickup:"Other",drop:"Self",driver:"Ashok",review:"Yes"},
  {id:"B091",car:"Jazz 2018",customer:"SLT Shreshtha Babu Suyog",type:"Monthly",start:"25 Oct 25",end:"24 Feb 26",days:120,revenue:78000,security:5000,refund:0,status:"Done",pickup:"Self",drop:"Self",driver:"SELF",review:""},
  {id:"B097",car:"Creta 2018",customer:"Gen Gagandeep (Outstation)",type:"Monthly",start:"21 Nov 25",end:"3 Jan 26",days:41,revenue:79200,security:8000,refund:800,status:"Done",pickup:"Self",drop:"Self",driver:"Tapas",review:""},
  {id:"B115",car:"Kwid 2020",customer:"Hrishabh M Nair",type:"Monthly",start:"9 Nov 25",end:"2 Jan 26",days:34,revenue:29000,security:5000,refund:4500,status:"Done",pickup:"Other",drop:"Self",driver:"Ajit Saha",review:"Yes"},
  {id:"B119",car:"Alto 2015",customer:"Dr Kriti Ojha",type:"Monthly",start:"12 Nov 25",end:"9 Jun 26",days:90,revenue:90000,security:5000,refund:0,status:"Active",pickup:"Other",drop:"Self",driver:"Ajit Saha",review:""},
  {id:"B135",car:"City 2017",customer:"Mrs Ipsita Malik",type:"Monthly",start:"22 Nov 25",end:"29 Mar 26",days:128,revenue:106667,security:5000,refund:0,status:"Done",pickup:"Other",drop:"Self",driver:"Tapas",review:""},
  {id:"B157",car:"Etios 2011",customer:"Cdr Ajay Chowdhry",type:"Monthly",start:"6 Dec 25",end:"8 Feb 26",days:60,revenue:40000,security:5000,refund:0,status:"Done",pickup:"Varuna",drop:"Office",driver:"Tapas",review:""},
  {id:"B177",car:"Nissan Kicks",customer:"Lt Col Jetender Deep Singh",type:"Weekly",start:"20 Dec 25",end:"8 Jan 26",days:20,revenue:36000,security:5000,refund:4026,status:"Done",pickup:"Other",drop:"Office",driver:"Ashok",review:""},
  {id:"B195",car:"Baleno 2017",customer:"Maj Dinoop Nair",type:"Monthly",start:"24 Dec 25",end:"15 Feb 26",days:53,revenue:48000,security:5000,refund:0,status:"Done",pickup:"Office",drop:"Office",driver:"Ashok",review:""},
  {id:"B213",car:"I10 2013",customer:"Gp Capt Guna",type:"Monthly",start:"4 Jan 26",end:"13 Apr 26",days:100,revenue:40500,security:18500,refund:11700,status:"Done",pickup:"AB Plaza",drop:"AB Plaza",driver:"SELF",review:"Yes"},
  {id:"B214",car:"City 2016",customer:"Col Mandeep Shandhu",type:"Weekly",start:"4 Jan 26",end:"25 Jan 26",days:21,revenue:23333,security:8000,refund:7200,status:"Done",pickup:"AB Plaza",drop:"AB Plaza",driver:"SELF",review:""},
  {id:"B222",car:"XUV 2018",customer:"Col Neeraj Bhardwaj",type:"Weekly",start:"22 Jan 26",end:"10 Feb 26",days:20,revenue:51000,security:10000,refund:0,status:"Done",pickup:"Office",drop:"Office",driver:"SELF",review:""},
  {id:"B223",car:"Nissan Kicks",customer:"Maj Vikas Rawat",type:"Weekly",start:"28 Jan 26",end:"7 Feb 26",days:10,revenue:20000,security:8000,refund:5860,status:"Done",pickup:"Airport",drop:"Airport",driver:"Tapas",review:"Yes"},
  {id:"B252",car:"Kwid 2020",customer:"Col Dhruv Sharma",type:"Monthly",start:"2 Feb 26",end:"3 Mar 26",days:30,revenue:22000,security:5000,refund:0,status:"Done",pickup:"Office",drop:"Other",driver:"",review:""},
  {id:"B260",car:"Swift Dzire 2010",customer:"Maj Tushar Fale",type:"Monthly",start:"31 Jan 26",end:"31 Mar 26",days:60,revenue:44500,security:6000,refund:0,status:"Done",pickup:"Airport",drop:"Office",driver:"",review:""},
  {id:"B279",car:"Etios 2011",customer:"Maj Shantanu",type:"Daily",start:"15 Feb 26",end:"16 Mar 26",days:30,revenue:20000,security:5000,refund:4500,status:"Done",pickup:"Other",drop:"Other",driver:"Ashok",review:""},
  {id:"B281",car:"Etios 2013",customer:"Lt Cdr Umesh",type:"Daily",start:"17 Feb 26",end:"19 Mar 26",days:30,revenue:24000,security:8000,refund:8000,status:"Done",pickup:"AB Plaza",drop:"AB Plaza",driver:"Tapas",review:"Yes"},
  {id:"B292",car:"City 2018",customer:"Col Navpreet",type:"Monthly",start:"24 Feb 26",end:"19 Mar 26",days:17,revenue:15300,security:10000,refund:12700,status:"Done",pickup:"AB Plaza",drop:"Office",driver:"Tapas",review:""},
  {id:"B297",car:"Jazz HP Auto",customer:"Col Pramod",type:"Daily",start:"14 Mar 26",end:"14 Apr 26",days:30,revenue:24000,security:10000,refund:10000,status:"Done",pickup:"AB Plaza",drop:"Office",driver:"Tapas",review:""},
  {id:"B305",car:"Kwid 2020",customer:"Mr Ravi Goel",type:"Monthly",start:"5 Mar 26",end:"30 Apr 26",days:57,revenue:39900,security:10000,refund:12100,status:"Done",pickup:"AB Plaza",drop:"Office",driver:"Tapas",review:""},
  {id:"B332",car:"Baleno 2017",customer:"Col Vipin Chaudhary",type:"Monthly",start:"29 Mar 26",end:"29 Jul 26",days:120,revenue:70000,security:10000,refund:5000,status:"Active",pickup:"AB Plaza",drop:"AB Plaza",driver:"Tapas",review:""},
  {id:"B335",car:"Celerio 2014",customer:"Col Renu Singh",type:"Monthly",start:"7 Apr 26",end:"10 May 26",days:30,revenue:20000,security:10000,refund:0,status:"Done",pickup:"AB Plaza",drop:"AB Plaza",driver:"Tapas",review:""},
  {id:"B343",car:"Alto k10 2013",customer:"Lt Artha",type:"Monthly",start:"7 Apr 26",end:"6 May 26",days:31,revenue:18054,security:10000,refund:5946,status:"Done",pickup:"Office",drop:"Office",driver:"Ashok",review:""},
  {id:"B348",car:"I10 2021",customer:"Mr Varun Sharma",type:"Monthly",start:"7 Apr 26",end:"5 Jun 26",days:60,revenue:46000,security:10000,refund:0,status:"Active",pickup:"AB Plaza",drop:"AB Plaza",driver:"Ashok",review:""},
  {id:"B349",car:"City 2018",customer:"Col Vikrant Mittal",type:"Monthly",start:"13 Apr 26",end:"12 May 26",days:30,revenue:24000,security:10000,refund:0,status:"Active",pickup:"AB Plaza",drop:"AB Plaza",driver:"Ashok",review:""},
  {id:"B354",car:"I20 2014",customer:"Cmde Vishal Roy",type:"Daily",start:"3 May 26",end:"10 May 26",days:7,revenue:11000,security:10000,refund:0,status:"Active",pickup:"Other",drop:"Airport",driver:"Ashok",review:""},
  {id:"B373",car:"Brezza 2017",customer:"Col Punam Gill",type:"Daily",start:"2 May 26",end:"19 May 26",days:17,revenue:26500,security:10000,refund:0,status:"Active",pickup:"Other",drop:"Airport",driver:"Ashok",review:""},
  {id:"B387",car:"Seltos 2020",customer:"Mr Sanjeev Kumar Dogra",type:"Monthly",start:"7 May 26",end:"5 Jun 26",days:30,revenue:47000,security:10000,refund:0,status:"Active",pickup:"Other",drop:"Other",driver:"Ashok",review:""},
  {id:"B388",car:"Etios 2011",customer:"Col Binsu Mathew Cherian",type:"Daily",start:"8 May 26",end:"12 May 26",days:4,revenue:2800,security:8000,refund:0,status:"Active",pickup:"Other",drop:"Airport",driver:"Ashok",review:""},
  {id:"B390",car:"Nissan Kicks",customer:"Capt Shubham",type:"Daily",start:"8 May 26",end:"12 May 26",days:4,revenue:5200,security:10000,refund:0,status:"Active",pickup:"Other",drop:"Airport",driver:"Ashok",review:""},
];

const fmt = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

export default function App() {
  const [view, setView] = useState("summary");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const active = DATA.filter(d => d.status === "Active");
  const done = DATA.filter(d => d.status === "Done");
  const totalRev = DATA.reduce((s, d) => s + d.revenue, 0);
  const reviewsDone = DATA.filter(d => d.review === "Yes").length;

  const carRev = useMemo(() => {
    const m = {};
    DATA.forEach(d => { m[d.car] = (m[d.car] || 0) + d.revenue; });
    return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, []);

  const filtered = useMemo(() => DATA.filter(d => {
    const s = search.toLowerCase();
    const matchSearch = !s || d.customer.toLowerCase().includes(s) || d.car.toLowerCase().includes(s) || d.id.toLowerCase().includes(s);
    const matchType = typeFilter === "All" || d.type === typeFilter;
    return matchSearch && matchType;
  }), [search, typeFilter]);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f6fa", minHeight: "100vh", color: "#1a1a1a" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>🚗 Fleet Manager</div>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2 }}>{DATA.length} total bookings</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>Total Revenue</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#2563eb" }}>{fmt(totalRev)}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "0 24px", display: "flex" }}>
        {[["summary", "📊 Summary"], ["bookings", "📋 All Bookings"]].map(([v, label]) => (
          <button key={v} onClick={() => setView(v)} style={{ padding: "12px 16px", border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: view === v ? 600 : 400, color: view === v ? "#2563eb" : "#6b7280", borderBottom: view === v ? "2px solid #2563eb" : "2px solid transparent" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>

        {/* SUMMARY VIEW */}
        {view === "summary" && (
          <>
            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Active Now", value: active.length, sub: "cars on duty", color: "#16a34a" },
                { label: "Completed", value: done.length, sub: "rentals", color: "#111" },
                { label: "Total Revenue", value: fmt(totalRev), sub: "all time", color: "#2563eb" },
                { label: "Reviews Got", value: reviewsDone, sub: `of ${DATA.length}`, color: "#f59e0b" },
              ].map(({ label, value, sub, color }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color }}>{value}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Active Rentals */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px", marginBottom: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>🟢 Currently Active Rentals ({active.length})</div>
              {active.map(b => (
                <div key={b.id} onClick={() => setSelected(b)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{b.customer}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>{b.car} · {b.type} · ends {b.end}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 600, color: "#2563eb", fontSize: 13 }}>{fmt(b.revenue)}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{b.days} days</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Vehicles */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: "18px 20px" }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>🏆 Top Earning Vehicles</div>
              {carRev.map(([car, rev]) => (
                <div key={car} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                    <span style={{ fontWeight: 500 }}>{car}</span>
                    <span style={{ fontWeight: 600, color: "#2563eb" }}>{fmt(rev)}</span>
                  </div>
                  <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3 }}>
                    <div style={{ height: "100%", width: `${Math.round((rev / carRev[0][1]) * 100)}%`, background: "#2563eb", borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BOOKINGS VIEW */}
        {view === "bookings" && (
          <>
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search customer, car or booking ID..."
                style={{ flex: 1, padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none" }}
              />
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
                style={{ padding: "9px 14px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, background: "#fff", cursor: "pointer", outline: "none" }}>
                <option>All</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>{filtered.length} bookings</div>

            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 110px 70px 90px 70px", gap: 12, padding: "10px 16px", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                <span>ID</span><span>Customer & Car</span><span>Dates</span><span>Type</span><span>Revenue</span><span>Status</span>
              </div>
              <div style={{ maxHeight: 540, overflowY: "auto" }}>
                {filtered.map(b => (
                  <div key={b.id}
                    onClick={() => setSelected(b)}
                    onMouseEnter={() => setHovered(b.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ display: "grid", gridTemplateColumns: "80px 1fr 110px 70px 90px 70px", gap: 12, padding: "12px 16px", borderBottom: "1px solid #f3f4f6", cursor: "pointer", background: hovered === b.id ? "#f9fafb" : "#fff", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{b.id}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{b.customer}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af" }}>{b.car}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>
                      <div>{b.start}</div>
                      <div style={{ color: "#9ca3af" }}>→ {b.end}</div>
                    </div>
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{b.type}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#2563eb" }}>{fmt(b.revenue)}</span>
                    <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: b.status === "Active" ? "#dcfce7" : "#f3f4f6", color: b.status === "Active" ? "#16a34a" : "#6b7280" }}>
                      {b.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: "100%", maxWidth: 460, maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{selected.id} · {selected.car}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{selected.customer}</div>
                <span style={{ display: "inline-block", marginTop: 6, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: selected.status === "Active" ? "#dcfce7" : "#f3f4f6", color: selected.status === "Active" ? "#16a34a" : "#6b7280" }}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 20, color: "#9ca3af", cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "16px 24px" }}>
              {[
                ["Rental Type", selected.type],
                ["Start Date", selected.start],
                ["End Date", selected.end],
                ["Duration", `${selected.days} days`],
                ["Revenue", fmt(selected.revenue)],
                ["Security Deposit", fmt(selected.security)],
                ["Refund Amount", fmt(selected.refund)],
                ["Pickup", `${selected.pickup} (${selected.driver || "—"})`],
                ["Drop", selected.drop],
                ["Google Review", selected.review === "Yes" ? "✅ Received" : selected.review === "No" ? "❌ Not given" : "⏳ Pending"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f9fafb", fontSize: 13 }}>
                  <span style={{ color: "#9ca3af" }}>{label}</span>
                  <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "55%" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

