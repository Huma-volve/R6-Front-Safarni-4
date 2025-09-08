type Props = {
  title: string;
};
const SubTitle = ({ title }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default SubTitle;
