from django.http import HttpResponse
from django.shortcuts import render
import requests
import subprocess
# Create your views here.


def hello(request):
    # print(request)
    if request.method == 'GET':
        q_id = request.GET.get('q_id')
        print(q_id)
        code = request.GET.get('code')
        print(code)
    result = 1
    if(execute_code(q_id, code) == False):
        result = 0
    return HttpResponse(result);

def execute_code(q_id, code):
    print(code)
    # subprocess.call("make -C codingQuestions/q_" + str(q_id) + "/ clean")
    now_dir = subprocess.check_output("pwd", shell=True).decode("utf-8")
    now_dir = now_dir[:-1]
    print(now_dir)
    q_f = open(now_dir + "/codingQuestions/q_" + str(q_id) + "/player.h", "w")
    q_f.write(code)
    q_f.close()

    try:
        # print("make -C " + now_dir + "/codingQuestions/q_" + str(q_id) + "/ clean")
        a = subprocess.call("rm codingQuestions/q_" + str(q_id) + "/test", shell=True)
    except Exception as e:
        print(0)
        print(e)
    try :
        subprocess.call("gcc -o codingQuestions/q_" + str(q_id) + "/test codingQuestions/q_" + str(q_id) + "/hello.c", shell=True)
    except Exception as e:
        print(1)
        print(e)
    try:
        answer = subprocess.check_output("codingQuestions/q_" + str(q_id) + "/a.out", shell=True)
    except:
        print(2)
    is_ex = True
    try:
        player_result = subprocess.check_output("codingQuestions/q_" + str(q_id) + "/test", shell=True)
    except Exception as e:
        print(e)
        is_ex = False
    if (is_ex == False):
        return False
    print(player_result)
    print(answer)
    # print(subprocess.check_output("pwd"))
    if (player_result == answer):
        return True
    else:
        return False
    # return True