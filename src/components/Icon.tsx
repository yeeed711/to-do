interface IIcon {
  name: string;
}

const Icon = ({ name }: IIcon) => {
  return (
    <div className='material-icons-round' style={{ fontSize: 'inherit' }}>
      {name}
    </div>
  );
};

export default Icon;
