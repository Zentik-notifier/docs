interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function TwoColumnLayout({ left, right }: TwoColumnLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
