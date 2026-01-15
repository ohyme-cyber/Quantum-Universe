---
title: Generalized Scrooge Ensemble
tags:
  - Deep-Thermalization
  - Projected-Ensemble
  - Minimal-M
  - Scooge
date: 2026-01-15
---
GSE 一般会在如下场景中emerge出来：
当系统有守恒量，并且在这个限制下fully scramble，那么可以根据measurement basis的情况进行分类：
1. Measurement basis没有泄露关于子系统B上守恒荷的信息（守恒荷在所有measurement basis上的分布是均等的）那么此时系统A上的Projected Ensemble会根据温度演化为Haar 或 Scrooge。
2. Measurement basis泄露了关于子系统B上守恒荷的信息，即当得到某个Measurement outcome |v> 之后，可以获知（可能可以）子系统A上守恒量的概率分布 p(Q_A|v)，那么子系统A上的Projected Ensemble 在fully scramble之后，每个configuration只能在自己的守恒量扇区内探索希尔伯特空间，因此得到的是按照概率叠加的Generalized Scrooge Ensemble $\mathcal{E}=\sum_{Q_{A}}{p(Q_{A}|v)\mathcal{E}_{Scrooge}[\rho_{Q_{A}}]}$. 其中具体的$\rho_{Q_{A}}$ 取决于输入态的configuration在不同扇区内的分布情况。

Example:
