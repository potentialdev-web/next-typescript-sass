import Head from 'next/head';
import { 
  useEffect, 
  useState,
  FC,
  ChangeEvent,
  KeyboardEvent,
  useCallback
} from 'react';
import data from '../mock/jobs.json';
import Header from '../components/header';
import JobItem from '../components/jobItem';
import Filter from '../components/filter';

const stackData = [
  // role
  'Frontend',
  'Backend',
  'Fullstack',
  // level
  'Midweight',
  'Junior',
  // languages
  'Ruby',
  'HTML',
  'CSS',
  'Python',
  'JavaScript',
  // tools
  'Vue',
  'React',
  'Django',
  'Sass',
  'RoR'
];

const options = stackData.map(item => ({
  label : item,
  value : item
}))


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);

  const handleSelectItem = (stackLabel: string): void => {
    if (!selectedStacks.find(x=>x.label === stackLabel)) {
      setSelectedStacks((prevSelects) => [...prevSelects, {label:stackLabel, value: stackLabel}]);
    } else {
      setSelectedStacks((prevSelects) => prevSelects.filter((x) => x.label !== stackLabel));
    }
  };

  const isMatched = useCallback((a, b)=>{
    let flag = true;
    a.forEach(itemA=>{
      if (b.indexOf(itemA) < 0){
        flag = false;
        return;
      }
    });
    return flag;
  }, []);

  useEffect(() => {
    setJobs(data);
  }, []);

  useEffect(()=>{
    if (selectedStacks.length > 0 && selectedStacks !== null) {
      const labels = selectedStacks.map(x => x.label);
      setFilteredJobs(
        jobs.filter(
          x => labels.indexOf(x.role) >= 0 
          || labels.indexOf(x.level) >=0 
          || isMatched(labels, x.languages) 
          || isMatched(labels, x.tools)
        )
      );
    } else{
      setFilteredJobs(jobs);
    }
  }, [selectedStacks, jobs]);

  return (
    <>
      <Head>
        <title>Job List | Copilot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      
      <main>
        <div className="container">
          <Filter 
            options={options}
            value={selectedStacks}
            onChange={action => {
              setSelectedStacks(action || []);
            }}
            className="select-filter"
          />
          {
            filteredJobs && filteredJobs.map(item => (
              <JobItem
                key={item.id}
                job={item}
                handleChange={handleSelectItem}
              />
            ))
          }
        </div>
      </main>
    </>
  )
}

export default Home
