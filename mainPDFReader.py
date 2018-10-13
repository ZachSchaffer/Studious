from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter#process_pdf
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams

from io import StringIO
import json
def pdf_to_text(pdfname):

    # PDFMiner boilerplate
    rsrcmgr = PDFResourceManager()
    sio = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, sio, codec=codec, laparams=laparams)
    interpreter = PDFPageInterpreter(rsrcmgr, device)

    # Extract text
    fp = open(pdfname, 'rb')
    for page in PDFPage.get_pages(fp):
        interpreter.process_page(page)
    fp.close()

    # Get text from StringIO
    text = sio.getvalue()

    # Cleanup
    device.close()
    sio.close()

    return text



text = pdf_to_text("./testPDF0.pdf")
topicsJson = None
with open('data.json','r') as studyGuide:
    topicsJson = json.load(studyGuide)
for x in topicsJson:
    print(x)
    print(topicsJson[x])
    topicsJson[x]['count']+=1
with open('data.json', 'w') as outfile:
    json.dump(topicsJson, outfile)



