from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter#process_pdf
from pdfminer.pdfpage import PDFPage
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
import sys
from io import StringIO
import json
import os
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


topicsJson = None
text = ""

items = os.listdir('./input/')
for names in items:
    if names.endswith('.txt'):
        text+=open("./input/"+names,"r").read()
    if names.endswith('.pdf'):
        text+=pdf_to_text("./input/"+names)
    if names.endswith('.html'):
        text+=open("./input/"+names,"r").read()

def stringMatch(topic, body):
    topicsJson[topic]['count'] = 0
    for word in topicsJson[topic]['words']:
        print(word)
        topicsJson[topic]['count']+=body.upper().count(word.upper())
print(text)
with open('data.json','r') as studyGuide:
    topicsJson = json.load(studyGuide)
for x in topicsJson:
    stringMatch(x, text)
with open('data.json', 'w') as outfile:
    json.dump(topicsJson, outfile)
print(text)

