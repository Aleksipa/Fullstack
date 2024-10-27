import React from "react";

interface HeaderProps {
  name: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <h1>{name}</h1>;
};

interface TotalProps {
  parts: CoursePart[];
}

export const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const renderPart = () => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <h3>
              {part.name} ({part.exerciseCount} exercises)
            </h3>
            <p>{part.description}</p>
          </div>
        );
      case "group":
        return (
          <div>
            <h3>
              {part.name} ({part.exerciseCount} exercises)
            </h3>
            <p>Project exercises: {part.groupProjectCount}</p>
          </div>
        );
      case "background":
        return (
          <div>
            <h3>
              {part.name} ({part.exerciseCount} exercises)
            </h3>
            <p>{part.description}</p>
            <p>
              Submit to:{" "}
              <a
                href={part.backgroundMaterial}
                target="_blank"
                rel="noopener noreferrer"
              >
                {part.backgroundMaterial}
              </a>
            </p>
          </div>
        );
      case "special":
        return (
          <div>
            <h3>
              {part.name} ({part.exerciseCount} exercises)
            </h3>
            <p>{part.description}</p>
            <p>Required skills: {part.requirements.join(", ")}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return renderPart();
};

function assertNever(value: never): never {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
}

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

const Total: React.FC<TotalProps> = ({ parts }) => {
  const totalExercises = parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return <p>Number of exercises {totalExercises}</p>;
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
