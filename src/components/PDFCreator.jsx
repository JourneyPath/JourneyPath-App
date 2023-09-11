import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#F5F5F5', 
    padding: 40,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskStep: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textDecoration: 'underline',
  },
  actionItem: {
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 12,
  },
  content: {
    marginBottom: 15,
  },
  text: {
    fontSize: 12,
  },
  inputField: {
    borderBottom: '1px solid #000',
    marginBottom: 10,
    fontSize: 12,
    paddingBottom: 3,
  },
  stepContainer: {
    border: '1px solid #000',
    padding: 10,
    backgroundColor: '#FFFFFF', // White background for steps
  },
  downloadButton: {
    display: 'inline-block',
    padding: '10px 20px',
    background: '#075550', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
  },
});

const ActionPlanPDF = ({ message }) => {
  const propertyLabels = {
    title: 'Project Title:',
    start_date: 'Project Start Date:',
    end_date: 'Project End Date:',
  };

  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Action Plan</Text>
            {Object.entries(message).map(([key, value], index) => (
              <View key={index} style={styles.content}>
                <Text style={styles.sectionHeading}>
                  {propertyLabels[key]}
                </Text>
                {key === 'tasks' ? (
                  <View style={styles.content}>
                    <Text style={styles.sectionHeading}>Tasks:</Text>
                    {value.map((task, taskIndex) => (
                      <View key={taskIndex} style={styles.content}>
                        <View style={styles.stepContainer}>
                          <Text style={styles.taskStep}>
                            Step {taskIndex + 1}:
                          </Text>
                          <Text>{task.description}</Text>
                          <Text>Start Date: {task.start_date}</Text>
                          <Text>End Date: {task.end_date}</Text>
                          {task.action_items && task.action_items.length > 0 && (
                            <View style={styles.content}>
                              <Text style={styles.sectionHeading}>
                                Action Items:
                              </Text>
                              <View>
                                {task.action_items.map(
                                  (actionItem, actionIndex) => (
                                    <Text
                                      key={actionIndex}
                                      style={styles.actionItem}
                                    >
                                      - {actionItem}
                                    </Text>
                                  )
                                )}
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.inputField}>{value}</Text>
                )}
              </View>
            ))}
          </Page>
        </Document>
      }
      fileName="action_plan.pdf"
    >
     {({ blob, url, loading, error }) => (
          <div
            style={styles.downloadButton}
          >
            {loading ? 'Generating PDF...' : 'Download PDF'}
          </div>
        )}
    </PDFDownloadLink>
  );
};

export default ActionPlanPDF;

