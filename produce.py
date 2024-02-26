import glob
files = glob.glob("*.png")
html_data = open('picl.html','a')
for file in files:
    #img_data = "<img src="+"\""+file+"\""+">"
    text_data = "<a href="+"\""+file+"\""+">"+file+"</a>"
    print(file)
    #html_data.write(img_data)
    html_data.write(text_data)