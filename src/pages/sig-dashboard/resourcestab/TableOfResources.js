
import { useMemo } from "react";
import GenerateTableOfResources from "./GenerateTableOfResources";
import { Link, Tag, Wrap, WrapItem, Text, IconButton, } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdMoreVert } from 'react-icons/md';



// Custom component to render Tag chips 
const Tags = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((tag, idx) => {
        return (
          <WrapItem>
            <Tag key={idx} size="sm">
              {tag}
            </Tag>
          </WrapItem>
        );
      })}
    </>
  );
};



function TableOfResources() {
    const columns = useMemo(() => [
      {
        Header: 'Title',
        accessor: 'resource',
        //width: 240,
        Cell: ({ value }) => {
          return (
            <Link href={value.url} color="teal.500" isExternal>
              {value.title} <ExternalLinkIcon mx="2px" />
            </Link>
          );
        },
      },
      {
        Header: 'Brief Description',
        accessor: 'briefDescription',
        //width: '20%', //296,
        Cell: ({ cell: { value } }) => <Text fontSize="14px">{value}</Text>,
      },
      
      /*{
        Header: 'Link',
        accessor: 'link',
        Cell: ({ cell: { value } }) => (
          <Link href={value} color="teal.500" fontSize="14px">
            View
          </Link>
        ),
        width: 80,
      }*/ {
        Header: 'Tags',
        accessor: 'tags',
        Cell: ({ cell: { value } }) => (
          <Wrap gap={2}>
            <Tags values={value} />
          </Wrap>
        ),
        //width: '10%', //200,
      },
      {
        Header: 'Date Added',
        accessor: 'date',
        width: 120,
        Cell: ({ cell: { value } }) => <Text fontSize="14px">{value}</Text>,
      },
      {
        Header: 'Added by',
        accessor: 'user',
        //width: '15%', //180,
        Cell: ({ cell: { value } }) => <Text fontSize="14px">{value}</Text>,
      },
      {
        Header: ' ',
        accessor: 'icon',
        width: 40,
        Cell: ({ cell: { value } }) => (
          <IconButton
            aria-label={value}
            icon={<MdMoreVert />}
            size="sm"
            variant="ghost"
          />
        ),
      },
    ]);

    /* const data = useMemo(() => makeData(100), []); */
    const RESOURCES_DATA = useMemo(
      () => [
        {
          resource: {
            title: 'Intro to Image Analysis in Matlab',
            url: 'https://www.mathworks.com/products/computer-vision.html',
          },
          briefDescription: 'Quick start to Image Analysis tools in Matlab',
          link: 'https://www.mathworks.com/products/computer-vision.html',
          tags: ['Beginner', 'Tools'],
          date: '2022 - 07 - 23',
          user: 'Tan Jiahui',
          icon: 'Options',
        },
        {
          resource: {
            title: 'List of Open Source IA Resources',
            url: 'https://pathways.mbic.cmu.edu/image-analysis-and-processing-resources/',
          },
          briefDescription: 'Collated list by CMU',
          link: 'https://pathways.mbic.cmu.edu/image-analysis-and-processing-resources/',
          tags: ['Beginner', 'Tools'],
          date: '2022 - 07 - 23',
          user: 'Roy Chen',
          icon: 'Options',
        },
        {
          resource: {
            title: "Beginner's Guide to Computer Vision",
            url: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          },
          briefDescription:
            'Medium blog which has links to online courses, TED talks. Seems useful.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Beginner', 'Guide'],
          date: '2022 - 07 - 22',
          user: 'Gil Tan',
          icon: 'Options',
        },
        {
          resource: {
            title: 'Learning OpenCV',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            "People have said it's one of the best resources for CV",
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Beginner', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Roy Chen',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Rajesh Ramayan',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Sarah Reubin',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Adityaraj Saroop',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Rajesh Ramayan',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Daylon Soh',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Basic programming framework. A little advanced, describes 2D and 3D CV.',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Rohan Gautam',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Description',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Pat Cheong',
          icon: 'Options',
        },
        {
          resource: {
            title:
              'An Introduction To 3D Computer Vision Techniques and Algorithms',
            url: 'http://www-cs.ccny.cuny.edu/~wolberg/capstone/opencv/LearningOpenCV.pdf',
          },
          briefDescription:
            'Description',
          link: 'https://medium.com/readers-writers-digest/beginners-guide-to-computer-vision-23606224b720',
          tags: ['Advanced', 'Book'],
          date: '2022 - 07 - 22',
          user: 'Jim Hopper',
          icon: 'Options',
        },
      ],
      []
    );

    

  return <GenerateTableOfResources columns={columns} data={RESOURCES_DATA} />;
}

export default TableOfResources;