interface ScreenProps {
    value: string;
}

function Screen(props: ScreenProps) {
    const { value } = props;

  return (
    <h2 className={`screen`}>{value}</h2>
  )
}

export default Screen
