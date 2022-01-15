import { useEffect } from "react";
import { Table } from "react-bootstrap";
import {useSelector} from 'react-redux'
import {report as reportCall} from "../../apicalls"
export function UsersReport() {

    const {report} = useSelector(store => store.admin)

    useEffect(() => {
        reportCall()
    }, [])

    return (
        <div style={{marginTop: "5px"}}>
            <h3 style={{textAlign: 'center'}}>Report</h3>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <td>Number of added entries in the last 7 days</td>
                        <td>{report?.report1?.first7days}</td>
                    </tr>
                    <tr>
                        <td>Number of added entries the week before 7 days</td>
                        <td>{report?.report1?.before7days}</td>
                    </tr>
                    <tr>
                        <td>The average number of calories added per user for the last 7 days</td>
                        <td>{report?.report2?.avgCalories7days}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
