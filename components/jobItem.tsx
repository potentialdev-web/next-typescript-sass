import PropTypes from 'prop-types';
import { 
  useEffect, 
  useState,
  FC
} from 'react';
import type { JobType } from '../types/types';

const featureLabel= (feature) => {
  const map = {
    new: {
      label: 'New!',
      className: 'new'
    },
    featured: {
      label: 'Featured',
      className: 'featured'
    }
  };

  const { label, className } = map[feature];

  return (
    <li className={className}>
      {label}
    </li>
  )
};

const JobItem = ({
  job,
  handleChange
}) => {
  useEffect(() => {
  });

  return (
    <div className={`job-item ${job.featured ? 'featured' : ''}`}>
      <div className="job-role">
        <img
          alt="company-logo"
          src={job.logo}
          className="company-logo"
        />
        <div 
          className="detail fontsize-normal"
        >
          <div 
            className="company-features"
          >
            <p 
              className="company-name fontsize-normal font-semi-bold"
            >
              {job.company}
            </p>
            <ul className="features">
              {
                job.new && (
                  featureLabel("new")
                )
              }
              {
                job.featured && (
                  featureLabel("featured")
                )
              }
            </ul>
          </div>
          <p className="position fontsize-big font-semi-bold">
            {job.position}
          </p>
          <div className="others">
            <p>{job.postedAt}</p>
            <p>{job.contract}</p>
            <p>{job.location}</p>
          </div>
        </div>
      </div>
      <hr />
      <ul className="job-stack">
        {
          job.role && (
            <li 
              className="fontsize-normal font-semi-bold"
              onClick={handleChange(job.role)}
            >
              {job.role}
            </li>
          )
        }
        {
          job.level && (
            <li className="fontsize-normal font-semi-bold"
              onClick={handleChange(job.level)}
            >
              {job.level}
            </li>
          )
        }
        {
          job.tools && job.tools.map((tool, index) => (
            <li 
              key={index} 
              onClick={handleChange(tool)}
              className="fontsize-normal font-semi-bold"
            >
              {tool}
            </li>
          ))
        }
        {
          job.languages && job.languages.map((language, index) => (
            <li 
              key={index}
              onClick={handleChange(language)}
              className="fontsize-normal font-semi-bold"
            >
              {language}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default JobItem;