import users from "../JSONs/user.json"
import Pagination from '../../components/Pagination';
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import Table from "../../components/Table";
import { LockKeyhole } from 'lucide-react';
import { Send } from 'lucide-react';
import { User } from 'lucide-react';

const columnName = [
    {
        "name": "Email/Username",
        "displayName": "Email/Username",
        "display": true,
        "attributes": [{
            "name": "email",
            "attributeStyles": {
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            display: "inline-block",
            backgroundColor: "#FFE5CC", 
            whiteSpace: "nowrap",
            color: "#FF6700",
            fontWeight: 600,
            padding: "4px 8px",
            borderRadius: "12px",
            fontStyle: "italic",
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name": "Role",
        "displayName": "Role",
        "display": true,
        "attributes": [{
            "name": "role",
            "attributeStyles": {
                "display": "inline-block",
                "backgroundColor": "#Ede0FF",
                "whiteSpace": "nowrap",
                "color": "#036FE3",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "24px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": (row) => {
            return (
                <>
                    {
                        row.role === "ROLE_ADMIN" &&
                        (
                            <div style={{
                                display: "flex",
                                backgroundColor: "#ede0ff",
                                whiteSpace: "nowrap",
                                color: "#742be2",
                                fontWeight: 600,
                                padding: "6px 10px",
                                borderRadius: "24px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div>
                                    <LockKeyhole width={20} height={20} />
                                </div>
                                <div style={{ fontWeight: 600, paddingLeft: "5px" }}>Admin</div>
                            </div>
                        )
                    }
                    {
                        row.role === "ROLE_AIRLINE" &&
                        (
                            <div style={{
                                display: "flex",
                                backgroundColor: "#ede0ff",
                                whiteSpace: "nowrap",
                                color: "#742be2",
                                fontWeight: 600,
                                padding: "6px 10px",
                                borderRadius: "24px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div>
                                    <Send width={20} height={20} />
                                </div>
                                <div style={{fontWeight: 600, paddingLeft: "5px" }}>Airline</div>
                            </div>
                        )
                    }
                    {
                        row.role === "ROLE_USER" &&
                        (
                            <div style={{
                                display: "flex",
                                backgroundColor: "#ede0ff",
                                whiteSpace: "nowrap",
                                color: "#742be2",
                                fontWeight: 600,
                                padding: "6px 10px",
                                borderRadius: "24px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <div>
                                    <User width={20} height={20} />
                                </div>
                                <div style={{fontWeight: 600, paddingLeft: "5px" }}>Flights</div>
                            </div>
                        )
                    }
                </>
            )
        }
    },
    {
        "name": "Airline Name",
        "displayName": "Airline Name",
        "display": true,
        "attributes": [{
            "name": "airline.airlineName",
            "attributeStyles": {
                "display": "inline-block",
                "backgroundColor": "#E8F5FF",
                "whiteSpace": "nowrap",
                "color": "#036FE3",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "24px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": (row) => {
            return (
                <>
                    {
                        row.airline ? (
                            <div style={{
                                "display": "inline-block",
                                "backgroundColor": "#E8F5FF",
                                "whiteSpace": "nowrap",
                                "color": "#036FE3",
                                "fontWeight": 600,
                                "padding": "4px 8px 4px 8px",
                                "borderRadius": "24px"
                            }}>
                                {row.airline.airlineName}
                            </div>
                        ) : null
                    }
                </>
            )
        }   
    },
    {
        "name": "Airline Code",
        "displayName": "Airline Code",
        "display": true,
        "attributes": [{
            "name": "airlineCode",
            "attributeStyles": {},
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": (row) => {
            return (
                <>
                    {
                        row.airlineCode ? (
                            <div style={{
                                fontStyle: "italic",
                            }}>
                                {row.airlineCode}
                            </div>
                        ) : (
                            <div style={{
                                fontStyle: "italic",
                            }}>
                                None Assigned
                            </div>
                        )
                    }
                </>
            )
        }
    },
    {
        "name": "Active/Inactive",
        "displayName": "Active/Inactive",
        "display": true,
        "attributes": [{
            "name": "active",
            "attributeStyles": {
                "display": "inline-block",
                "backgroundColor": "#CEFFED",
                "whiteSpace": "nowrap",
                "color": "#15845C",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "6px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",   
        "renderCell": (row) => {
            return (
                <>
                    {
                        row.active ?
                        <div style={{
                            display: "inline-block",
                            backgroundColor: "#CEFFED",
                            whiteSpace: "nowrap",
                            color: "#15845C",
                            fontWeight: 600,
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px"
                        }}>
                            Active
                        </div>
                        :
                        <div style={{
                            display: "inline-block",
                            backgroundColor: "#F7F9FA",
                            whiteSpace: "nowrap",
                            color: "#67728A",
                            fontWeight: 600,
                            padding: "4px 8px 4px 8px",
                            borderRadius: "24px"
                        }}>
                            Inactive
                        </div>
                    }
                </>
            )
        }
    },
    {
        "name": "Activate/Deactivate",
        "displayName": "Active",
        "display": true,
        "attributes": [{
            "name": "active",
            "attributeStyles": {
                "display": "inline-block",
                "backgroundColor": "#CEFFED",
                "whiteSpace": "nowrap",
                "color": "#15845C",
                "fontWeight": 600,
                "padding": "4px 8px 4px 8px",
                "borderRadius": "6px"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {
            "display": "inline-block"
        },
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": (row) => {
            return (
                <>
                { !row.active &&
                    <button 
                        style = {{
                        border : "1px solid #E2E2E2",
                        }}
                        className="inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-600 bg-white hover:bg-white"
                    >Activate</button>
                }
                {
                    row.active &&
                    <button 
                        style = {{
                        border : "1px solid #E2E2E2",
                        fontSize: "12px",
                        }}
                        className="inline-flex items-center px-2 py-2 border border-transparent font-medium rounded-md text-red-500 bg-white hover:bg-white"
                    >Deactivate</button>
                }
                </>
            )
        }
    }
]

function Users() {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const totalPages = Math.ceil(users.length / rowsPerPage);
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Table
          data={users}
          columnName={columnName}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    );
}

export default Users
