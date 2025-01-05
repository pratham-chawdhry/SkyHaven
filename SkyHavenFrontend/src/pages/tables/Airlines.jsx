import React, { useState } from 'react';
import Table from '../../components/Table'
import { borderRadius, display, fontWeight, padding, textAlign } from '@mui/system'
import Pagination from '../../components/Pagination'
import Modal from '../../components/Modal';
import { Trash2 } from 'lucide-react';
import { ShieldHalf } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { BadgePercent } from 'lucide-react';
import '../add/Table.css';

const discountContent = (row) => {
    return (
        <div>
            <div className = "shadow-md" style = {{
                borderRadius: "8px",
                padding : "30px 20px",
                "display": "flex",
                "alignItems": "center",
                "gap": "30px",
            }}>
                <div style = {{
                    paddng : "20px",
                    display: "inline-block",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    padding: "32px 20px",
                    borderRadius: "40px",
                    color: "#036FE3", 
                    backgroundColor: "#E8F5FF",
                }}>
                    <div className='flex items-center gap-5'>
                        {/* <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tickets-plane"><path d="M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"/><path d="m12 13.5 3.75.5"/><path d="m4.5 8 10.58-5.06a1 1 0 0 1 1.342.488L18.5 8"/><path d="M6 10V8"/><path d="M6 14v1"/><path d="M6 19v2"/><rect x="2" y="8" width="20" height="13" rx="2"/></svg>
                        </div> */}
                        <div style = {{fontWeight: 600, fontSize: "30px", lineHeight: "20px"}}>
                            {row.airlineName}
                        </div>
                    </div>
                </div>
                <div className='mt-2' style = {{
                    "display": "inline-block",
                    "backgroundColor": "#CEFFED",
                    "whiteSpace": "nowrap",
                    "color": "#15845C",
                    "fontWeight": 600,
                    "padding": "4px 8px 4px 8px",
                    "borderRadius": "6px",
                    "fontStyle": "italic",
                    "fontSize": "25px",
                }}>
                    {row.airlineCode}
                </div>
            </div>
            <div style={{
                overflowY: "auto",
                height: "300px",
            }}>
                <table>
                    <tbody>
                        {
                            row.discounts.map((discount) => (
                                <tr>
                                    {/* <div className = "flex items-center justify-between" style = {{
                                        display: "flex",
                                        alignItems: "center",
                                        borderBottom: "1px solid #CFD9E0",
                                        padding: "10px 20px",
                                        gap: "10px",
                                    }}> */}
                                        <td className='flex items-center gap-2'>
                                            <div style = {{
                                                marginLeft: "20px",
                                            }}>
                                                {
                                                    discount.discountName === "Armed Forces" && <ShieldHalf style = {{
                                                        width: "35px",
                                                        height: "35px",
                                                        color: "black",
                                                    }}
                                                    strokeWidth={1.5}/>
                                                }
                                                {
                                                    discount.discountName === "Students" && <BookOpen style = {{
                                                        width: "35px",
                                                        height: "35px",
                                                        color: "black",
                                                    }}
                                                    strokeWidth={1.5}/>
                                                }
                                                {
                                                    discount.discountName === "Doctors & Nurses" && 
                                                    <svg style = {{color: "black"}} xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-medical"><path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                                                }
                                                {
                                                    discount.discountName === "Senior Citizens" && <UserRound style = {{
                                                        width: "35px",
                                                        height: "35px",
                                                        color: "black",
                                                    }}                    
                                                    strokeWidth={1.5}/>
                                                }
                                            </div>
                                            <div style = {{
                                                paddingRight: "10px",
                                            }}>
                                                <div style = {{
                                                color : "#67728A", 
                                                fontWeight: 500,
                                                fontSize: "15px",
                                                }}>
                                                    {discount.discountName}
                                                </div>
                                                {discount.discountUpTo && <div style = {{
                                                color : "#67728A", 
                                                fontWeight: 500,
                                                fontSize: "10px",
                                                }}>
                                                    upto ${discount.discountUpTo}
                                                </div>}
                                            </div>
                                        </td>
                                        <td>
                                            <div style = {{
                                                color : "#67728A",
                                                fontWeight: 400,
                                                fontSize: "23px",
                                                fontStyle: "italic",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "4px",
                                                justifyContent: "center",
                                            }}>
                                                <div>
                                                    {discount.discountPercentage}
                                                </div>
                                                <div><BadgePercent style = {{
                                                    width: "20px",
                                                    height: "20px",
                                                }}
                                                strokeWidth={1.5}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: "red",
                                                    padding: "4px 4px",
                                                    color: "white",
                                                    borderRadius: "6px",
                                                }}>
                                                <Trash2 className='w-4 h-4'/>
                                            </button>
                                        </td>
                                    {/* </div> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const airlines = [
    {
        "id": 1,
        "airlineName": "United Airlines",
        "airlineCode": "UA",
        "data": null,
        "description": "United Airlines, Inc. is a major American airline headquartered in Chicago, Illinois. It was founded in 1926 and has since grown to become one of the largest airlines in the world, offering domestic and international flights to numerous destinations. United Airlines is known for its broad network, fleet diversity, and partnerships with global airline alliances such as Star Alliance. It provides a wide range of services to passengers, including various classes of service, in-flight entertainment, and loyalty programs such as MileagePlus, offering frequent flyers the chance to earn miles for travel rewards.",
        "users": [],
        "flights": [],
        "discounts": [{
            "discountName": "Armed Forces",
            "discountPercentage": 40,
            "discountUpTo" : 600,
        },
        {
            "discountName": "Senior Citizens",
            "discountPercentage": 12,
            "discountUpTo" : 500,
        },
        {
            "discountName": "Students",
            "discountPercentage": 20,
            "discountUpTo" : 1000,
        },
        {
            "discountName": "Doctors & Nurses",
            "discountPercentage": 5,
            "discountUpTo" : null
        }
        ]
    },
    {
        "id": 2,
        "airlineName": "Southwest Airlines",
        "airlineCode": "WN",
        "data": null,
        "description": "Southwest Airlines Co. is a low-cost carrier based in Dallas, Texas. Founded in 1967, Southwest Airlines has grown to be one of the largest airlines in the United States by passenger volume, known for its distinctive business model that emphasizes affordable fares, free checked bags, and a simplified booking process. Unlike most major carriers, Southwest operates a point-to-point network, focusing on offering short-haul flights with low-cost, no-frills service. The airline has a strong reputation for its employee culture and customer service, as well as its unique open seating policy that allows passengers to choose their seats upon boarding.",
        "users": [],
        "flights": [],
        "discounts": [{
            "discountName": "Armed Forces",
            "discountPercentage": 20,
            "discountUpTo" : 1200,
        },
        {
            "discountName": "Senior Citizens",
            "discountPercentage": 10,
            "discountUpTo" : 600,
        },
        {
            "discountName": "Students",
            "discountPercentage": 25,
            "discountUpTo" : null,
        },
        {
            "discountName": "Doctors & Nurses",
            "discountPercentage": 10,
            "discountUpTo" : 600,
        }
        ]
    },
    {
        "id": 3,
        "airlineName": "British Airways",
        "airlineCode": "BA",
        "data": null,
        "description": "British Airways (BA) is the flag carrier airline of the United Kingdom, headquartered in London. With a history dating back to 1974, British Airways is one of the largest and most prominent airlines globally. The airline operates an extensive international network, with a focus on connecting London to major cities around the world, as well as offering transatlantic services to North America and beyond. BA is part of the International Airlines Group (IAG), one of the world’s largest airline groups, and it serves both business and leisure travelers. British Airways is also known for its premium services, including its first-class lounges, in-flight entertainment, and exclusive loyalty program, Avios.",
        "users": [],
        "flights": [],
        "discounts": [{
            "discountName": "Armed Forces",
            "discountPercentage": 30,
            "discountUpTo" : 800,
        },
        {
            "discountName": "Senior Citizens",
            "discountPercentage": 15,
            "discountUpTo" : 500,
        },
        {
            "discountName": "Students",
            "discountPercentage": 30,
            "discountUpTo" : null,
        },
        {
            "discountName": "Doctors & Nurses",
            "discountPercentage": 15,
            "discountUpTo" : 500,
        }
    ]
    },
    {
        "id": 4,
        "airlineName": "Delta Air Lines",
        "airlineCode": "DL",
        "data": null,
        "description": "Delta Air Lines, Inc. is a major American airline, headquartered in Atlanta, Georgia. It is one of the oldest airlines in the world, founded in 1924 as a crop-dusting operation in Macon, Georgia. Today, Delta is a legacy carrier and one of the largest airlines globally, offering a vast network of domestic and international flights with a focus on providing exceptional customer service, on-time performance, and a comfortable flying experience. Delta is also a founding member of the SkyTeam global airline alliance and operates an extensive fleet of both narrow and wide-body aircraft.",
        "users": [],
        "flights": [],
        "discounts": [{
            "discountName": "Armed Forces",
            "discountPercentage": 10,
            "discountUpTo" : 600,
        },
        {
            "discountName": "Senior Citizens",
            "discountPercentage": 5,
            "discountUpTo" : 300,
        },
        {
            "discountName": "Students",
            "discountPercentage": 10,
            "discountUpTo" : null,
        },
        {
            "discountName": "Doctors & Nurses",
            "discountPercentage": 5,
            "discountUpTo" : 300,
        }
        ]
    },
    {
        "id": 5,
        "airlineName": "Emirates",
        "airlineCode": "EK",
        "data": null,
        "description": "Emirates Airline is a global airline based in Dubai, United Arab Emirates, and is one of the largest international airlines in the world. Founded in 1985, Emirates has expanded rapidly and is known for its modern fleet, exceptional service, and long-haul flights connecting Dubai to major cities across six continents. Emirates offers luxury services, including private suites, fully-flat beds in business class, and gourmet dining. The airline has established a strong reputation for its premium in-flight experiences, including entertainment options with its award-winning ICE system, making it a preferred choice for travelers seeking comfort and world-class service.",
        "users": [],
        "flights": [],
        "discounts": [{
            "discountName": "Armed Forces",
            "discountPercentage": 20,
            "discountUpTo" : 800,
        },
        {
            "discountName": "Senior Citizens",
            "discountPercentage": 15,
            "discountUpTo" : 500,
        },
        {
            "discountName": "Students",
            "discountPercentage": 20,
            "discountUpTo" : null,
        },
        {
            "discountName": "Doctors & Nurses",
            "discountPercentage": 15,
            "discountUpTo" : 500,
        }
    ]   
    }
]

const columnName = [
    {
        "name": "Airline Id",
        "displayName": "Airline Id",
        "display": true,
        "attributes": [{
            "name": "id",
            "attributeStyles": {
                "fontWeight": 500,
                "color": "#036FE3"
            },
            "attributeClassName": "text-center"
        }],
        "cellStyle": {},
        "cellClassName": "text-center",
        "titleStyle": {
            "whiteSpace": "nowrap"
        },
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name": "Airline Name",
        "displayName": "Airline Name",
        "display": true,
        "attributes": [{
            "name": "airlineName",
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
        "renderCell": null
    },
    {
        "name": "Airline Code",
        "displayName": "Airline Code",
        "display": true,
        "attributes": [{
            "name": "airlineCode",
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
        "renderCell": null
    },
    {
        "name": "Description",
        "displayName": "Description",
        "display": true,
        "attributes": [{
            "name": "description",
            "attributeStyles": {},
            "attributeClassName": "text-left"
        }],
        "cellStyle": {},
        "cellClassName": "text-left",
        "titleStyle": {},
        "titleClassName": "",
        "renderCell": null
    },
    {
        "name": "Discounts",
        "displayName": "Discounts",
        "display": true,
        "attributes": [{
            "name": "discounts",
            "attributeStyles": {},
            "attributeClassName": "text-left"
        }],
        "cellStyle": {},
        "cellClassName": "text-center",
        "titleStyle": {},
        "titleClassName": "",
        "renderCell": (row) => {
            return (
                <div>
                    <Modal content={discountContent(row)} width={"500px"} />
                </div>
            )
        }
    }
]


export default function Airlines() {
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 10; 

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  
    const totalPages = Math.ceil(airlines.length / rowsPerPage);
  
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        className="mt-10"
      >
        <Table
          data={airlines}
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

