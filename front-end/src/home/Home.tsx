import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import style from './Home.module.css';
import { useState } from 'react';

interface IFormInput {
  email: string;
  lastName: string;
}

const Home = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, lastName }) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/register', {
        email,
        lastName,
      });
      setIsSuccess(true);
      reset();
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={style.success}>Form send</div>
        ) : (
          <>
            <h1>GTA-6</h1>
            <input
              type="text"
              placeholder="lastName"
              {...register('lastName')}
            />
            <input type="text" placeholder="Email" {...register('email')} />
            <button disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Add a request'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Home;
