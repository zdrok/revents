import React from 'react'
import { Menu, Header } from 'semantic-ui-react'
import Calendar from 'react-calendar'

export default function 
EventFilters
 () {
    // 
    return (
        <>
<Menu vertical size='large' style={{width: '100%'}}>
    <Header icon='filter' color='teal' content='Filters' />
        <Menu.Item content='All Events' />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hoisting" />
</Menu>
    <Header icon='calendar' color='teal' content='Select date' attached />
    <Calendar />
        </>
    )
}