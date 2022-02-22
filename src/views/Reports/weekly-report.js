import React from "react";
import { useSelector } from "react-redux";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from 'material-table';


export default function WeeklyReport() {

    const { items } = useSelector(state => state.task);

    const columns = [
        {
          field: 'description',
          title: 'Description'
        },
        {
          field: 'objective.description',
          title: 'Objective' 
        },
        {
          field: 'kpis',
          title: 'KPI',
          render: list => {
            return list.kpis && list.kpis.map((detail, index) => {
                if(detail.title != null) {
                    return (<p key={index}>{detail.title}</p>)
                } else if (detail.title === null || detail.title === undefined) {
                  return (<p key={index}>None</p>)                  }
            })

          }
        }, 
        {
          field: 'start_date',
          title: 'Start Date'
        }, 
        {
          field: 'end_date',
          title: 'End Date '
        }, 
        { 
          field: 'status',
          title: 'Status' 
        }
    ]

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>Weekly Report</h4>
              </CardHeader>
              <CardBody>

              {items !== null ? (
                <MaterialTable
                title="Weekly Report"
                data={items}
                columns={columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
            />

            ) :
            
            <MaterialTable
                title="Weekly Report"
                data={[]}
                columns={columns}
                options={{
                    search: true,
                    sorting: true,
                    pageSize: 10,
                    pageSizeOptions: [10,50,100 ],
                    exportButton: true
                }}
            />
            }

              </CardBody>
            </Card>
          </GridItem>
      </GridContainer>
    </div>
  );
}
