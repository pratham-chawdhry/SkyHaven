import React, { useState } from 'react';
import Table from '../../components/Table'
import { borderRadius, display, fontWeight, padding, textAlign } from '@mui/system'
import Pagination from '../../components/Pagination'

const airlines = [
    {
        "id": 1,
        "airlineName": "United Airlines",
        "airlineCode": "UA",
        "data": null,
        "description": "United Airlines, Inc. is a major American airline headquartered in Chicago, Illinois. It was founded in 1926 and has since grown to become one of the largest airlines in the world, offering domestic and international flights to numerous destinations. United Airlines is known for its broad network, fleet diversity, and partnerships with global airline alliances such as Star Alliance. It provides a wide range of services to passengers, including various classes of service, in-flight entertainment, and loyalty programs such as MileagePlus, offering frequent flyers the chance to earn miles for travel rewards.",
        "users": [],
        "flights": []
    },
    {
        "id": 2,
        "airlineName": "Southwest Airlines",
        "airlineCode": "WN",
        "data": null,
        "description": "Southwest Airlines Co. is a low-cost carrier based in Dallas, Texas. Founded in 1967, Southwest Airlines has grown to be one of the largest airlines in the United States by passenger volume, known for its distinctive business model that emphasizes affordable fares, free checked bags, and a simplified booking process. Unlike most major carriers, Southwest operates a point-to-point network, focusing on offering short-haul flights with low-cost, no-frills service. The airline has a strong reputation for its employee culture and customer service, as well as its unique open seating policy that allows passengers to choose their seats upon boarding.",
        "users": [],
        "flights": []
    },
    {
        "id": 3,
        "airlineName": "British Airways",
        "airlineCode": "BA",
        "data": null,
        "description": "British Airways (BA) is the flag carrier airline of the United Kingdom, headquartered in London. With a history dating back to 1974, British Airways is one of the largest and most prominent airlines globally. The airline operates an extensive international network, with a focus on connecting London to major cities around the world, as well as offering transatlantic services to North America and beyond. BA is part of the International Airlines Group (IAG), one of the world’s largest airline groups, and it serves both business and leisure travelers. British Airways is also known for its premium services, including its first-class lounges, in-flight entertainment, and exclusive loyalty program, Avios.",
        "users": [],
        "flights": []
    },
    {
        "id": 4,
        "airlineName": "Delta Air Lines",
        "airlineCode": "DL",
        "data": null,
        "description": "Delta Air Lines, Inc. is a major American airline, headquartered in Atlanta, Georgia. It is one of the oldest airlines in the world, founded in 1924 as a crop-dusting operation in Macon, Georgia. Today, Delta is a legacy carrier and one of the largest airlines globally, offering a vast network of domestic and international flights with a focus on providing exceptional customer service, on-time performance, and a comfortable flying experience. Delta is also a founding member of the SkyTeam global airline alliance and operates an extensive fleet of both narrow and wide-body aircraft.",
        "users": [],
        "flights": []
    },
    {
        "id": 5,
        "airlineName": "Emirates",
        "airlineCode": "EK",
        "data": null,
        "description": "Emirates Airline is a global airline based in Dubai, United Arab Emirates, and is one of the largest international airlines in the world. Founded in 1985, Emirates has expanded rapidly and is known for its modern fleet, exceptional service, and long-haul flights connecting Dubai to major cities across six continents. Emirates offers luxury services, including private suites, fully-flat beds in business class, and gourmet dining. The airline has established a strong reputation for its premium in-flight experiences, including entertainment options with its award-winning ICE system, making it a preferred choice for travelers seeking comfort and world-class service.",
        "users": [],
        "flights": []
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
