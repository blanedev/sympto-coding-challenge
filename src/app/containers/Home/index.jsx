import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import './styles.scss';

export const Home = () => {
  const history = useHistory();

  return (
    <>
      <h2>Home</h2>
      <Button
        className="w-full mb-medium"
        type="primary"
        size="large"
        onClick={() => history.push('/patients')}
      >
        Patients Management
      </Button>
      <Button
        className="w-full"
        type="primary"
        size="large"
        onClick={() => history.push('/appointments')}
      >
        Appointments Management
      </Button>
    </>
  );
};

export default Home;
