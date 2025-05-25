const cardStyle = {
  width: 320,
  borderRadius: 16,
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  background: "#f8f8f8",
  fontFamily: "sans-serif",
  overflow: "hidden",
  border: "2px solid #e0e0e0",
};

const contentStyle = {
  padding: 16,
};

const nameStyle = {
  fontSize: 24,
  fontWeight: "bold",
  marginBottom: 8,
  color: "#2d2d2d",
};

const factsStyle = {
  marginBottom: 12,
};

const factItemStyle = {
  fontSize: 14,
  color: "#555",
  marginBottom: 4,
};

const statsContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  background: "#e9e9ff",
  padding: "8px 12px",
  borderRadius: 8,
};

const statLabelStyle = {
  fontSize: 12,
  color: "#666",
};

const statValueStyle = {
  fontSize: 18,
  fontWeight: "bold",
  color: "#333",
};

interface TradingCardProps {
  image: string;
  name: string;
  facts: string[];
  stats: { value: string; label: string }[];
}

export function TradingCard({
  image,
  name,
  facts = [],
  stats = [],
}: TradingCardProps) {
  return (
    <div style={cardStyle}>
      {/* <Image
        src={image}
        alt={name}
        width={320}
        height={200}
        style={{ border: "solid black 2px" }}
      /> */}
      <div style={contentStyle}>
        <div style={nameStyle}>{name}</div>
        <div style={factsStyle}>
          {facts.map((fact: string, idx: number) => (
            <div key={idx} style={factItemStyle}>
              • {fact}
            </div>
          ))}
        </div>
        <div style={statsContainerStyle}>
          {stats.map((stat: { value: string; label: string }, idx: number) => (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={statValueStyle}>{stat.value}</div>
              <div style={statLabelStyle}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
