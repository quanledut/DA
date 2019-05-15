import React, { Component } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import {Dialog} from '@material-ui/core'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        width: '100%'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

export class InvoicePdf extends Component {
    render() {
        return (
            <div style = {{height:500, width:1000}}>
            <PDFViewer>
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
            </div>
            
        )
    }
}

export default InvoicePdf
