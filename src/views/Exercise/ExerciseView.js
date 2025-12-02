import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/user.service';
import ExerciseProfessorView from './ExerciseProfessorView';
import ExerciseStudentView from './ExerciseStudentView';

const ExerciseView = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserProfile();
      setUser(response);
    };

    fetchUser();
  }, []);

  return (
    <>
      {user.appRoleId == 1 ? <ExerciseProfessorView /> : <ExerciseStudentView />}
    </>
  );
};

export default ExerciseView;