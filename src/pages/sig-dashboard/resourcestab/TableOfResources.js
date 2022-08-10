
import { useMemo } from "react";
import GenerateTableOfResources from "./GenerateTableOfResources";


function TableOfResources() {
    const columns = useMemo(() => [
      {
        Header: 'Hello',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Brief Description',
            accessor: 'briefDescription',
          },
          {
            Header: 'Link',
            accessor: 'link',
          },
          {
            Header: 'Tags',
            accessor: 'tags',
          },
          {
            Header: 'Date Added',
            accessor: 'date',
          },
          {
            Header: 'Added by',
            accessor: 'user',
          },
          {
            Header: 'i',
            accessor: 'icon',
          },
        ],
      },
    ], []
    );

    /* const data = useMemo(() => makeData(100), []); */
    const RESOURCES_DATA = [
      {
        title: 'Intro to Image Analysis in Matlab',
        briefDescription: 'Quick start to Image Analysis tools in Matlab',
        link: 'https://www.mathworks.com/products/computer-vision.html',
        tags: 'beginner, tools',
        date: '2022 - 07 - 23',
        user: 'Tay Jiahui',
        icon: `<p>Text</p>`,
      },
    ];

    return <GenerateTableOfResources columns={columns} data={RESOURCES_DATA} />;
}

export default TableOfResources;