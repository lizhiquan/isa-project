import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeworkList from './components/Homework/HomeworkList';
import Signin from './components/Signin/Signin';
import CourseList from './components/Course/CourseList';
import Stats from './components/Stats/Stats';
import Admin from './components/Admin/Admin';
import NavBar from './components/NavBar/NavBar';
import { getCourses, getHomework } from './api/apiService';
import { getToken } from './utils';

function App() {
  const [isAdmin, setIsAdmin] = useState(!!getToken());
  const [courses, setCourses] = useState();
  const [homework, setHomework] = useState();

  const handleGetCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetHomework = async () => {
    try {
      const res = await getHomework();
      setHomework(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCourses();
    handleGetHomework();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Router>
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => (
              <HomeworkList
                isAdmin={isAdmin}
                homework={homework}
                courses={courses}
                onUpdateHomeworkList={setHomework}
              />
            )}
          />
          <Route exact path={'/stats'} render={() => <Stats />} />
          <Route exact path={'/courses'} render={() => <CourseList isAdmin={isAdmin} courses={courses} />} />
          <Route exact path={'/login'} render={() => <Signin onSignIn={() => setIsAdmin(true)} />} />
          <Route exact path={'/admin'} render={() => <Admin onCoursesChange={handleGetCourses} courses={courses} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
