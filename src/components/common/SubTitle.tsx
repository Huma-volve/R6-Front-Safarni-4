
type Props = {
  title: string;
  btn ?: string
};
const SubTitle = ({ title, btn}: Props) => {
  return (
    <div className="flex items-center justify-between my-5">
      <h1 className="text-2xl">{title}</h1>
      {btn && <p className="text-primary font-semibold text-xl">{btn}</p>}
    </div>
  );
};

export default SubTitle;
