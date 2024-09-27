<template>
    <div id="powercard">
        <div class="powercardborder">
            <div class="powercardencounter">

                <input v-model="powerName" class="powername" placeholder="name"></input>
                <!-- <span class="powerlvl">阿戈拉隆德的欣布后继者攻击&nbsp;11</span> -->
            </div>
            <table class="details">
                <tbody>
                    <!-- <tr>
                        <th>目标：</th>
                        <td>

                            <ElTag v-for="target of enemyList">{{ target.type }} lv {{ target.lv }}</ElTag>

                            <button @click="targetDialogShow = true">+</button>
                        </td>

                    </tr> -->
                    <tr>
                        <th>攻击：</th>
                        <td>
                            <ElInput v-model="attackBonus" style="width: 50px" size="small" placeholder="命中加值" > </ElInput>
                            
                        vs.
                            <!-- <select v-model="defense">
                                <option value="auto">必中</option>
                                <option value="ac">AC</option>
                                <option value="fortitude ">强韧</option>
                                <option value="reflex ">反射</option>
                                <option value="will">意志</option>

                            </select> -->
                            <div v-for="target of enemyList" style="display: inline;padding:2px"  v-on:click="editTargetHandle(target)">
                                <ElTag  style="width: 30px" size="small" > {{ target.defense }}</ElTag>
                            </div>
                            
                            <button @click="enemyList.push({})">+</button>
                        </td>
                    </tr>
                    <!-- <tr>
                        <th></th>
                        <td>

                            <ElTag v-for="modifier of modifierList">{{ modifier.type }} {{ modifier.value }}</ElTag>

                            <button @click="modifierDialogShow = true">+</button>
                        </td>

                    </tr> -->
                    <tr>
                        <th>命中：</th>
                        <td>1d6 + 智力调整值的伤害，且直到遭遇结束，之后你每次以攻击命中该目标时，它受到等同于一半你的等级的额外伤害</td>
                    </tr>
                    <tr>
                        <th>失手：</th>
                        <td>1d6 + 智力调整值的伤害，且直到遭遇结束，之后你每次以攻击命中该目标时，它受到等同于一半你的等级的额外伤害</td>
                    </tr>
                    <tr>
                        <th>效果：</th>
                        <td>1d6 + 智力调整值的伤害，且直到遭遇结束，之后你每次以攻击命中该目标时，它受到等同于一半你的等级的额外伤害</td>
                    </tr>
                   
                </tbody>
            </table>
        </div>

    </div>
    <ElDialog v-model="targetDialogShow" :width="300">
        <div> <span>类型:</span>
            <select v-model="enemyObject.type">
                <option value="蛮战">蛮战</option>
                <option value="护卫">护卫</option>
                <option value="游击">游击</option>
                <option value="伏兵">伏兵</option>
                <option value="远程">远程</option>
                <option value="控制">控制</option>
                <option value="领导">领导</option>
            </select>
        </div>
        <div> <span>lv:</span>
            <ElInput v-model="enemyObject.lv"> </ElInput>
        </div>
        <div> <span>防御:</span>
            <ElInput v-model="enemyObject.defense"> </ElInput>
        </div>
        <!-- <ElButton @click="addTarget">添加</ElButton> -->
        <ElButton @click="targetDialogShow=false">确定</ElButton>
        <ElButton @click="removeTarget">移除</ElButton>
    </ElDialog>
    <ElDialog v-model="modifierDialogShow" :width="300">
        <div> <span>类型:</span>
            <ElInput v-model="modifierObject.type"></ElInput>
        </div>
        <div> <span>值:</span>
            <ElInput v-model="modifierObject.value"> </ElInput>
        </div>
        <ElButton @click="addModifier">添加</ElButton>
    </ElDialog>
</template>
<script lang="ts" setup name="Power">
import { ref } from 'vue';
import { Modifier } from "../class/Modifier"
import { Enemy } from "../class/Enemy"
import { ElDialog, ElInput, ElButton, ElTag } from "element-plus"
// const props = defineProps({
//     children: {
//         type: Object,
//         default: () => {
//             return null
//         }
//     },
// })
const powerName = ref('')
const targetDialogShow = ref(false)
const enemyObject = ref({ type: '', lv: 0 } as Enemy)
const enemyList = ref([] as Enemy[])
const modifierDialogShow = ref(false)
const modifierObject = ref({ type: '', value: 0 } as Modifier)
const modifierList = ref([] as Modifier[])
// const children = props.children
// const defense = ref('')
const attackBonus=ref(0)

const addModifier = () => {
    let modifier = { type: '', value: 0 } as Modifier
    modifier = Object.assign(modifier, modifierObject.value)
    modifierList.value.push(modifier)
    modifierObject.value = { type: '', value: 0 }
    modifierDialogShow.value = false
}
const editTargetHandle = (target:Enemy) =>{
    targetDialogShow.value=true
    enemyObject.value=target
}
const removeTarget=(target:Enemy) =>{
    let index=0;
    for (let tempIndex in enemyList.value){
        if (enemyList.value[tempIndex]==target){
            index=tempIndex as any as number
        }
    }
    enemyList.value.splice(index, 1);
    targetDialogShow.value=false
}
</script>